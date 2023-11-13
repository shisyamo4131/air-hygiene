<template>
  <air-template-default label="初期化処理">
    <template #default>
      <v-container>
        <v-form
          ref="form"
          v-model="formVerified"
          :disabled="loading"
          @submit.prevent
        >
          <a-select
            v-model="selectedItem"
            label="初期化対象"
            :items="items"
            item-text="name"
            item-value="name"
            required
            return-object
          />
          <v-btn
            color="primary"
            :disabled="!formVerified || loading"
            :loading="loading"
            @click="onClickSubmit"
            >実行</v-btn
          >
        </v-form>
        <v-card outlined class="mt-6">
          <v-card-title>PROGRESS</v-card-title>
          <v-card-text>
            <v-progress-linear :value="ratio" height="25">
              <template #default>
                <strong>
                  {{ `${progress.value}/${progress.max}(${ratio}%)` }}
                </strong>
              </template>
            </v-progress-linear>
          </v-card-text>
        </v-card>
      </v-container>
    </template>
  </air-template-default>
</template>

<script>
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  updateDoc,
  where,
} from 'firebase/firestore'
import ASelect from '~/components/atoms/inputs/ASelect.vue'
import defaultCustomers from '~/assets/defaultCustomers.json'
import defaultSites from '~/assets/defaultSites.json'
import defaultSiteUnitPrices from '~/assets/defaultSiteUnitPrices.json'
import defaultCollectItems from '~/assets/defaultCollectItems.json'
import defaultUnits from '~/assets/defaultUnits.json'
import setting from '~/assets/setting.json'
export default {
  components: { ASelect },
  data() {
    return {
      cache: {
        Customers: [],
        Sites: [],
      },
      formVerified: false,
      items: setting.collections,
      loading: false,
      selectedItem: null,
      progress: {
        value: 0,
        max: 0,
      },
    }
  },
  computed: {
    ratio() {
      if (!this.progress.value && !this.progress.max) return 0
      return Math.ceil((this.progress.value / this.progress.max) * 100)
    },
  },
  methods: {
    async onClickSubmit() {
      try {
        this.loading = true
        if (!this.selectedItem) return
        if (this.selectedItem.autonumber.status) {
          await this.toggleAutonumberStatus(this.selectedItem.name, false)
        }
        await this[`init${this.selectedItem.name}`]()
        if (this.selectedItem.autonumber.status) {
          await this.updateAutonumber(
            this.selectedItem.name,
            this.selectedItem.autonumber.field
          )
        }
      } catch (err) {
        // eslint-disable-next-line
        console.error(err)
        alert(err.message)
      } finally {
        if (this.selectedItem.autonumber.status) {
          await this.toggleAutonumberStatus(this.selectedItem.name, true)
        }
        this.loading = false
      }
    },
    async initCustomers() {
      this.cache.Customers.splice(0)
      const colRef = collection(this.$firestore, 'Customers')
      const snapshot = await getDocs(colRef)
      if (!snapshot.empty) {
        snapshot.docs.forEach((doc) => {
          this.cache.Customers.push(doc.data())
        })
      }
      this.progress.value = 0
      this.progress.max = defaultCustomers.length
      for (const item of defaultCustomers) {
        const model = this.$Customer()
        const exist = await this.getCustomer(item.code)
        if (!exist) {
          model.initialize(item)
          await model.create()
        } else {
          model.initialize({ ...exist, ...item })
          await model.update()
        }
        this.progress.value = this.progress.value + 1
      }
    },
    async initSites() {
      this.progress.value = 0
      this.progress.max = defaultSites.length
      const items = defaultSites
        .map((item) => {
          return { ...item }
        })
        .filter((_, index) => index < 10)
      for (const item of items) {
        const model = this.$Site()
        const [customer, site] = await Promise.all([
          this.getCustomer(item.customer),
          this.getSite(item.code),
        ])
        if (!customer) {
          // eslint-disable-next-line
          console.log(item)
          throw new Error('Customer is not exist specified by Site.')
        }
        item.customer = customer
        if (!site) {
          model.initialize(item)
          await model.create()
        } else {
          model.initialize({ ...site, ...item })
          await model.update()
        }
        await this.initSiteUnitPrices(model)
        this.progress.value = this.progress.value + 1
      }
    },
    async initSiteUnitPrices(siteModel) {
      // pre. 既存の回収単価を全て削除
      const path = `SiteUnitPrices`
      const colRef = collection(this.$firestore, path)
      const q = query(colRef, where('siteId', '==', siteModel.docId))
      const snapshot = await getDocs(q)
      if (!snapshot.empty) {
        const promises = []
        snapshot.docs.forEach((doc) => {
          promises.push(deleteDoc(doc.ref))
        })
        await Promise.all(promises)
      }
      const items = defaultSiteUnitPrices.filter(
        ({ code }) => code === siteModel.code
      )
      const siteUnitPrices = []
      for (const item of items) {
        // 0. item、unitのdocIdを取得
        const collectItemId = this.getItem(item.itemCode)?.docId || undefined
        const unitId = this.getUnit(item.unitCode)?.docId || undefined
        const id = `${collectItemId}-${unitId}`
        const price = parseInt(item.price)
        const unitPrice = { id, collectItemId, unitId, price }
        if (!collectItemId || !unitId) {
          // eslint-disable-next-line
          console.log(item)
          throw new Error('no item or unit.')
        }
        // 1. 直前締日の翌日（以下、基準日）を取得
        const getBaseDate = (date, deadline) => {
          try {
            if (deadline === '99') {
              return this.$dayjs(date).startOf('month')
            } else {
              return this.$dayjs(`${date.substr(0, 8)}${deadline}`)
                .subtract(1, 'month')
                .add(1, 'day')
            }
          } catch (err) {
            // eslint-disable-next-line
            console.log({ err, date, deadline })
            alert(err)
          }
        }
        const baseDate = getBaseDate(item.date, siteModel.customer.deadline)
        // 2. 起算日が基準日以前の契約単価を取得
        const latestSiteUnitPrice = siteUnitPrices.find(
          ({ date }) => date <= baseDate.format('YYYY-MM-DD')
        )
        // 3-1. 契約単価が存在しなれば作成
        if (!latestSiteUnitPrice) {
          siteUnitPrices.push({
            siteId: siteModel.docId,
            date: baseDate.format('YYYY-MM-DD'),
            details: [unitPrice],
          })
        }
        // 3-2. 契約単価が存在した場合
        else {
          const isUnitPriceExist = latestSiteUnitPrice.details.some(
            ({ id }) => id === `${collectItemId}-${unitId}`
          )
          // 3-2-1. 同一idの単価が登録されていなければ当該契約に登録
          if (!isUnitPriceExist) {
            latestSiteUnitPrice.details.push(unitPrice)
          }
          // 3-2-2. 同一idの単価が登録されていれば、直前締日翌日の1ヶ月後を起算日にして契約を作成
          else {
            siteUnitPrices.push({
              siteId: siteModel.docId,
              date: baseDate.format('YYYY-MM-DD'),
              details: [unitPrice],
            })
          }
        }
        siteUnitPrices.sort((a, b) => {
          if (a.date < b.date) return 1
          if (a.date > b.date) return -1
          return 0
        })
      }
      siteUnitPrices.sort((a, b) => {
        if (a.date < b.date) return -1
        if (a.date > b.date) return 1
        return 0
      })
      siteUnitPrices.forEach((item, index, arr) => {
        if (index !== 0) {
          item.details = [
            ...arr[index - 1].details.filter((price) => {
              return !item.details.map(({ id }) => id).includes(price.id)
            }),
            ...item.details,
          ]
        }
      })
      await Promise.all(
        siteUnitPrices.map((item) => {
          const siteUnitPriceModel = this.$SiteUnitPrice(siteModel.docId)
          siteUnitPriceModel.initialize(item)
          return siteUnitPriceModel.create()
        })
      )
    },
    async initCollectItems() {
      const colRef = collection(this.$firestore, 'CollectItems')
      const snapshot = await getDocs(colRef)
      const existItems = snapshot.docs.map((doc) => doc.data())
      const getItem = (code) => {
        return existItems.find((item) => item.code === code)
      }
      this.progress.value = 0
      this.progress.max = defaultCollectItems.length
      for (const item of defaultCollectItems) {
        const model = this.$CollectItem()
        const exist = getItem(item.code)
        if (!exist) {
          model.initialize(item)
          await model.create()
        } else {
          model.initialize({ ...exist, ...item })
          await model.update()
        }
        this.progress.value = this.progress.value + 1
      }
    },
    async initUnits() {
      const colRef = collection(this.$firestore, 'Units')
      const snapshot = await getDocs(colRef)
      const existUnits = snapshot.docs.map((doc) => doc.data())
      const getUnit = (code) => {
        return existUnits.find((item) => item.code === code)
      }
      this.progress.value = 0
      this.progress.max = defaultUnits.length
      for (const item of defaultUnits) {
        const model = this.$Unit()
        const exist = getUnit(item.code)
        if (!exist) {
          model.initialize(item)
          await model.create()
        } else {
          model.initialize({ ...exist, ...item })
          await model.update()
        }
        this.progress.value = this.progress.value + 1
      }
    },
    async toggleAutonumberStatus(colName, status) {
      const docRef = doc(this.$firestore, `Autonumbers/${colName}`)
      await updateDoc(docRef, { status })
    },
    async updateAutonumber(colName, field) {
      const colRef = collection(this.$firestore, colName)
      const q = query(colRef, orderBy(field, 'desc'), limit(1))
      const snapshot = await getDocs(q)
      if (snapshot.empty) return
      const current = snapshot.docs[0].data()[field]
      const docRef = doc(this.$firestore, `Autonumbers/${colName}`)
      await updateDoc(docRef, { current: parseInt(current) })
    },
    async getCustomer(code) {
      try {
        let result = this.cache.Customers.find((item) => item.code === code)
        if (!result) {
          const colRef = collection(this.$firestore, 'Customers')
          const q = query(colRef, where('code', '==', code))
          const snapshot = await getDocs(q)
          if (snapshot.empty) return undefined
          result = snapshot.docs[0].data()
          this.cache.Customers.push(result)
        }
        return result
      } catch (err) {
        // eslint-disable-next-line
        console.error(err)
        alert(err.message)
      }
    },
    async getSite(code) {
      try {
        let result = this.cache.Sites.find((item) => item.code === code)
        if (!result) {
          const colRef = collection(this.$firestore, 'Sites')
          const q = query(colRef, where('code', '==', code))
          const snapshot = await getDocs(q)
          if (snapshot.empty) return undefined
          result = snapshot.docs[0].data()
          this.cache.Sites.push(result)
        }
        return result
      } catch (err) {
        // eslint-disable-next-line
        console.error(err)
        alert(err.message)
      }
    },
    getItem(code) {
      const result = this.$store.state.masters.CollectItems.find(
        (item) => item.code === code
      )
      return result
    },
    getUnit(code) {
      const result = this.$store.state.masters.Units.find(
        (item) => item.code === code
      )
      return result
    },
  },
}
</script>

<style></style>
