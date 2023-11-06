<script>
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import HTextFieldYearMonth from '../../molecules/inputs/HTextFieldYearMonth.vue'
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
    height: { type: [String, Number], default: undefined, required: false },
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
        { text: '区分', value: 'resultType' },
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
      return this.items.filter((item) => {
        if (!this.selectedCollectItemId) return true
        return item.details.some(
          ({ collectItemId }) => collectItemId === this.selectedCollectItemId
        )
      })
    },
    internalHeight() {
      if (!this.height) return
      const decrease = this.$vuetify.breakpoint.mobile ? 56 : 64
      return parseInt(this.height) - decrease
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
        where('site.docId', '==', this.siteId),
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
    :height="internalHeight"
    :sort-by="['date']"
    sort-desc
    :items="internalItems"
    v-on="$listeners"
  >
    <template #top>
      <v-toolbar flat>
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
      <v-chip
        v-if="selectedItem && selectedItem.docId === item.docId"
        class="mr-2"
        color="info"
        left
        x-small
        >編集中</v-chip
      >
      {{ item.date }}
    </template>
    <template #[`item.resultType`]="{ item }">
      {{ $COLLECTION_RESULT_TYPE[item.resultType] }}
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
