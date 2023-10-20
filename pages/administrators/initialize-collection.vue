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
import defaultItems from '~/assets/defaultItems.json'
import defaultUnits from '~/assets/defaultUnits.json'
export default {
  components: { ASelect },
  data() {
    return {
      formVerified: false,
      items: [
        {
          text: '取引先',
          value: 'Customers',
          isAutonumber: true,
          field: 'code',
        },
        {
          text: '排出場所',
          value: 'Sites',
          isAutonumber: true,
          field: 'code',
        },
        { text: '回収品目', value: 'Items', isAutonumber: false, field: '' },
        { text: '単位', value: 'Units', isAutonumber: false, field: '' },
      ],
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
        if (this.selectedItem.isAutonumber) {
          await this.toggleAutonumberCondition(this.selectedItem.value, false)
        }
        await this[`init${this.selectedItem.value}`]()
        if (this.selectedItem.isAutonumber) {
          await this.updateAutonumber(
            this.selectedItem.value,
            this.selectedItem.field
          )
        }
      } catch (err) {
        // eslint-disable-next-line
        console.error(err)
        alert(err.message)
      } finally {
        if (this.selectedItem.isAutonumber) {
          await this.toggleAutonumberCondition(this.selectedItem.value, true)
        }
        this.loading = false
      }
    },
    async initCustomers() {
      const colRef = collection(this.$firestore, 'Customers')
      const snapshot = await getDocs(colRef)
      const existCustomers = snapshot.docs.map((doc) => doc.data())
      const getCustomer = (code) => {
        return existCustomers.find((item) => item.code === code)
      }
      this.progress.value = 0
      this.progress.max = defaultCustomers.length
      for (const item of defaultCustomers) {
        const model = this.$Customer()
        const exist = getCustomer(item.code)
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
      for (const item of defaultSites.filter(
        ({ code }) => code <= '00000012'
      )) {
        // for (const item of defaultSites) {
        const model = this.$Site()
        const getCustomer = async (code) => {
          const colRef = collection(this.$firestore, 'Customers')
          const q = query(colRef, where('code', '==', code))
          const snapshot = await getDocs(q)
          if (snapshot.empty) return undefined
          return snapshot.docs[0].data()
        }
        item.customer = await getCustomer(item.customer)
        const getSite = async (code) => {
          const colRef = collection(this.$firestore, 'Sites')
          const q = query(colRef, where('code', '==', code))
          const snapshot = await getDocs(q)
          if (snapshot.empty) return undefined
          return snapshot.docs[0].data()
        }
        const exist = await getSite(item.code)
        if (!exist) {
          model.initialize(item)
          await model.create()
        } else {
          model.initialize({ ...exist, ...item })
          await model.update()
        }
        await this.initSiteUnitPrices(model)
        this.progress.value = this.progress.value + 1
      }
    },
    async initSiteUnitPrices(siteModel) {
      // pre. 既存の回収単価を全て削除
      const colRef = collection(
        this.$firestore,
        `Sites/${siteModel.docId}/SiteUnitPrices`
      )
      const snapshot = await getDocs(colRef)
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
      for (const item of items) {
        // 0. item、unitのdocIdを取得
        const itemId =
          this.$store.state.masters.Items.find(
            ({ code }) => code === item.itemCode
          )?.docId || undefined
        const unitId =
          this.$store.state.masters.Units.find(
            ({ code }) => code === item.unitCode
          )?.docId || undefined
        if (!itemId || !unitId) {
          // eslint-disable-next-line
          console.log(item)
          throw new Error('no item or unit.')
        }
        // 1. 直前締日の翌日（以下、基準日）を取得
        const getBaseDate = (date, deadline) => {
          if (deadline === '99') {
            return this.$dayjs(date).startOf('month')
          } else {
            return this.dayjs(`${date.substr(0, 8)}${deadline}`)
              .subtract(1, 'month')
              .add(1, 'day')
          }
        }
        const baseDate = getBaseDate(item.date, siteModel.customer.deadline)
        // 2. 基準日が起算日の契約単価を取得
        const siteUnitPriceModel = this.$SiteUnitPrice(siteModel.docId)
        await siteUnitPriceModel.fetchLatest(baseDate.format('YYYY-MM-DD'))
        // 3-1. 契約単価が存在しなれば作成
        if (!siteUnitPriceModel.docId) {
          siteUnitPriceModel.initialize({
            date: baseDate.format('YYYY-MM-DD'),
            prices: [{ itemId, unitId, price: parseInt(item.price) }],
          })
          await siteUnitPriceModel.create()
        }
        // 3-2. 契約単価が存在した場合
        else {
          const isExist = siteUnitPriceModel.prices.some(
            ({ key }) => key === `${itemId}-${unitId}`
          )
          // 3-2-1. 同一keyの単価が登録されていなければ当該契約に登録
          if (!isExist) {
            siteUnitPriceModel.prices.push({
              itemId,
              unitId,
              price: parseInt(item.price),
            })
            await siteUnitPriceModel.update()
          }
          // 3-2-2. 同一keyの単価が登録されていれば、直前締日翌日の1ヶ月後を起算日にして契約を作成
          else {
            siteUnitPriceModel.initialize({
              date: baseDate.add(1, 'month').format('YYYY-MM-DD'),
              prices: [{ itemId, unitId, price: item.price }],
            })
            await siteUnitPriceModel.create()
          }
        }
      }
    },
    async initItems() {
      const colRef = collection(this.$firestore, 'Items')
      const snapshot = await getDocs(colRef)
      const existItems = snapshot.docs.map((doc) => doc.data())
      const getItem = (code) => {
        return existItems.find((item) => item.code === code)
      }
      this.progress.value = 0
      this.progress.max = defaultItems.length
      for (const item of defaultItems) {
        const model = this.$Item()
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
    async toggleAutonumberCondition(colName, condition) {
      const docRef = doc(this.$firestore, `Autonumbers/${colName}`)
      await updateDoc(docRef, { condition })
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
  },
}
</script>

<style></style>
