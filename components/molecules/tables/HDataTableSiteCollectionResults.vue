<script>
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import HTextFieldYearMonth from '../inputs/HTextFieldYearMonth.vue'
import HAutocompleteCollectItem from '../inputs/HAutocompleteCollectItem.vue'
export default {
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: { HTextFieldYearMonth, HAutocompleteCollectItem },
  /******************************************************************
   * PROPS
   ******************************************************************/
  props: {
    siteId: { type: String, default: '', required: false },
    yearMonth: { type: String, default: '', required: false },
  },
  /******************************************************************
   * DATA
   ******************************************************************/
  data() {
    return {
      headers: [
        { text: '回収日', value: 'date' },
        { text: '回収品目', value: 'collectItemId' },
        { text: '回収量', value: 'amount' },
        { text: '回収単位', value: 'unitId' },
        { text: '請求単価', value: 'unitPrice' },
      ],
      items: [],
      lazyYearMonth: this.$dayjs().format('YYYY-MM'),
      listener: null,
    }
  },
  /******************************************************************
   * COMPUTED
   ******************************************************************/
  computed: {
    internalYearMonth: {
      get() {
        return this.lazyYearMonth
      },
      set(v) {
        this.lazyYearMonth = v
        this.$emit('update:yearMonth', v)
      },
    },
  },
  /******************************************************************
   * WATCH
   ******************************************************************/
  watch: {
    siteId() {
      this.subscribe()
    },
    lazyYearMonth() {
      this.subscribe()
    },
    yearMonth: {
      handler(newVal, oldVal) {
        if (!newVal && !oldVal) return
        this.lazyYearMonth = newVal
      },
      immediate: true,
    },
  },
  /******************************************************************
   * MOUNTED
   ******************************************************************/
  mounted() {
    this.subscribe()
  },
  /******************************************************************
   * METHODS
   ******************************************************************/
  methods: {
    subscribe() {
      this.unsubscribe()
      if (!this.siteId || !this.internalYearMonth) return
      const colRef = collection(this.$firestore, 'CollectionResults')
      const q = query(
        colRef,
        where('siteId', '==', this.siteId),
        where('yearMonth', '==', this.internalYearMonth)
      )
      this.listener = onSnapshot(q, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          const item = change.doc.data()
          const index = this.items.findIndex(
            ({ docId }) => docId === item.docId
          )
          if (change.type === 'added') this.items.push(item)
          if (change.type === 'modified') this.items.splice(index, 1, item)
          if (change.type === 'removed') this.items.splice(index, 1)
        })
      })
      /* eslint-disable */
      console.info(`[Air Hygiene] Subscribe to 'CollectionResults'.`)
      console.table({ siteId: this.siteId, yearMonth: this.internalYearMonth })
      /* eslint-enable */
    },
    unsubscribe() {
      if (this.listener) {
        this.listener()
        /* eslint-disable */
        console.log(`[Air Hygiene] Unsubscribed from 'CollectionResults'`)
        /* eslint-enable */
      }
      this.items.splice(0)
    },
  },
}
</script>

<template>
  <v-data-table :headers="headers" :items="items">
    <template #top>
      <v-toolbar dense>
        <h-text-field-year-month v-model="internalYearMonth" hide-details />
        <v-spacer />
        <h-autocomplete-collect-item hide-details label="回収品目" />
      </v-toolbar>
    </template>
  </v-data-table>
</template>

<style></style>
