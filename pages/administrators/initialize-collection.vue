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
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  updateDoc,
} from 'firebase/firestore'
import ASelect from '~/components/atoms/inputs/ASelect.vue'
import defaultCustomers from '~/assets/defaultCustomers.json'
import defaultSites from '~/assets/defaultSites.json'
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
      for (const item of defaultSites) {
        const model = this.$Site()
        item.customer = this.$store.state.masters.Customers.find(
          ({ code }) => code === item.customer
        )
        const exist = this.$store.state.masters.Sites.find(
          ({ code }) => code === item.code
        )
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
