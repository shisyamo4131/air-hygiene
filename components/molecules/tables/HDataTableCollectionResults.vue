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
    hideDefaultFooter: { type: Boolean, default: true, required: false },
    itemsPerPage: { type: Number, default: -1, required: false },
    siteId: { type: String, default: '', required: false },
    showActions: { type: Boolean, default: false, required: false },
    yearMonth: { type: String, default: '', required: false },
    selectedItem: { type: Object, default: null, required: false },
  },
  /******************************************************************
   * DATA
   ******************************************************************/
  data() {
    return {
      headers: [
        { text: '回収日', value: 'date' },
        { text: '回収品目', value: 'collectItemId' },
        { text: '回収量', value: 'amount', sortable: false, align: 'right' },
        { text: '単価', value: 'unitPrice', sortable: false, align: 'right' },
        { text: '金額', value: 'sales', sortable: false, align: 'right' },
      ],
      items: [],
      lazyYearMonth: this.$dayjs().format('YYYY-MM'),
      listener: null,
      selectedCollectItemId: null,
    }
  },
  /******************************************************************
   * COMPUTED
   ******************************************************************/
  computed: {
    internalHeaders() {
      const result = this.headers.map((item) => item)
      if (this.showActions) {
        result.push({
          text: 'actions',
          value: 'actions',
          sortable: false,
          align: 'right',
        })
      }
      return result
    },
    internalYearMonth: {
      get() {
        return this.lazyYearMonth
      },
      set(v) {
        this.lazyYearMonth = v
        this.$emit('update:yearMonth', v)
      },
    },
    internalItems() {
      return this.items.filter(({ collectItemId }) => {
        if (!this.selectedCollectItemId) return true
        return collectItemId === this.selectedCollectItemId
      })
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
  <v-data-table
    v-bind="{ ...$props, ...$attrs }"
    fixed-header
    :headers="internalHeaders"
    :sort-by="['date', 'collectItemId']"
    sort-desc
    :items="internalItems"
    v-on="$listeners"
  >
    <template #top>
      <v-toolbar dense>
        <h-text-field-year-month v-model="internalYearMonth" hide-details />
        <v-spacer />
        <h-autocomplete-collect-item
          v-model="selectedCollectItemId"
          hide-details
          label="回収品目"
          clearable
        />
      </v-toolbar>
    </template>
    <template #[`item.date`]="{ item }">
      <v-icon
        v-if="selectedItem && selectedItem.docId === item.docId"
        color="primary"
        left
        small
        >mdi-check</v-icon
      >
      {{ item.date }}
    </template>
    <template #[`item.collectItemId`]="{ item }">
      {{
        $store.getters['masters/CollectItem'](item.collectItemId)?.abbr ||
        'undefined'
      }}
    </template>
    <template #[`item.amount`]="{ item }">
      {{
        `${(item?.amount || 0).toFixed(2)} ${
          $store.getters['masters/Unit'](item.unitId)?.abbr || 'undefined'
        }`
      }}
    </template>
    <template #[`item.unitPrice`]="{ item }">
      {{ `${(item.unitPrice || 0).toFixed(2)} 円` }}
    </template>
    <template #[`item.sales`]="{ item }">
      {{ `${(item.sales || 0).toFixed(2)} 円` }}
    </template>
    <template #[`item.actions`]="{ item }">
      <v-btn color="primary" small @click="$emit('click:edit', item)"
        >編集</v-btn
      >
    </template>
  </v-data-table>
</template>

<style></style>
