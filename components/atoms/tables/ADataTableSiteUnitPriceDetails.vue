<script>
/**
 * ### HDataTableSiteunitPriceDetails
 *
 * @author shisyamo4131
 */
import ADataTable from '~/components/atoms/tables/ADataTable.vue'
export default {
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: { ADataTable },
  /******************************************************************
   * DATA
   ******************************************************************/
  data() {
    return {
      headers: [
        { text: '回収品目', value: 'collectItemId' },
        { text: '単位', value: 'unitId', align: 'center', sortable: false },
        { text: '単価', value: 'unitPrice', align: 'right', sortable: false },
      ],
    }
  },
  /******************************************************************
   * METHODS
   ******************************************************************/
  methods: {
    collectItem(id) {
      const item = this.$store.getters['masters/CollectItem'](id)
      return item
    },
    unit(id) {
      const item = this.$store.getters['masters/Unit'](id)
      return item
    },
  },
}
</script>

<template>
  <a-data-table v-bind="$attrs" :headers="headers" v-on="$listeners">
    <template #[`item.collectItemId`]="{ item }">
      {{ collectItem(item.collectItemId)?.abbr || 'undefined' }}
    </template>
    <template #[`item.unitId`]="{ item }">
      {{ unit(item.unitId)?.abbr || 'undefined' }}
    </template>
    <template #[`item.unitPrice`]="{ item }">
      {{ `${$airNumericToSeparatedString(item.unitPrice)} 円` }}
    </template>
  </a-data-table>
</template>

<style></style>
