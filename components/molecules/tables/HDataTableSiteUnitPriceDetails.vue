<script>
/**
 * ### HDataTableSiteUnitPriceDetails
 *
 * @author shisyamo4131
 */
import HDataTable from './HDataTable.vue'
export default {
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: { HDataTable },
  /******************************************************************
   * PROPS
   ******************************************************************/
  props: {
    items: { type: Array, default: () => [], required: false },
  },
  /******************************************************************
   * DATA
   ******************************************************************/
  data() {
    return {
      // customFilter: (value, search, item) => {
      //   if (item.code.includes(search)) return true
      //   if (item.name.includes(search)) return true
      //   if (item.nameKana.includes(search)) return true
      //   if (item.abbr.includes(search)) return true
      //   return false
      // },
      headers: [
        { text: '回収品目', value: 'collectItemId' },
        { text: '単位', value: 'unitId' },
        { text: '単価', value: 'unitPrice', align: 'right', sortable: false },
      ],
    }
  },
  /******************************************************************
   * COMPUTED
   ******************************************************************/
  computed: {
    internalItems() {
      return this.items
        .map((item) => item)
        .sort((a, b) => {
          if (a.id < b.id) return -1
          if (a.id > b.id) return 1
          return 0
        })
    },
  },
}
</script>

<template>
  <h-data-table
    v-bind="$attrs"
    :headers="headers"
    :items="internalItems"
    disable-sort
    v-on="$listeners"
  >
    <template #[`item.collectItemId`]="{ item }">
      {{
        $store.getters['masters/CollectItem'](item.collectItemId)?.abbr ||
        'undefined'
      }}
    </template>
    <template #[`item.unitId`]="{ item }">
      {{ $store.getters['masters/Unit'](item.unitId)?.abbr || 'undefined' }}
    </template>
    <template #[`item.unitPrice`]="{ item }">
      {{ `${$airNumericToSeparatedString(item?.unitPrice || 0)}円` }}
    </template>
  </h-data-table>
</template>

<style></style>
