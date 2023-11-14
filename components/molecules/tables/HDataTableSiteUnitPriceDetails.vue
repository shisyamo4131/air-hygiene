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
        { text: '単価', value: 'unitPrice' },
      ],
    }
  },
}
</script>

<template>
  <h-data-table v-bind="$attrs" :headers="headers" v-on="$listeners">
  </h-data-table>
</template>

<style></style>
