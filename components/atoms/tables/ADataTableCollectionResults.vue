<script>
/**
 * ### HDataTableCollectionResults
 *
 * @author shisyamo4131
 */
import ADataTable from './ADataTable.vue'
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
        { text: '日付', value: 'date' },
        { text: '回収区分', value: 'resultType' },
        { text: '一廃重量', value: 'municipalWeight', align: 'right' },
        { text: '産廃重量', value: 'industrialWeight', align: 'right' },
        { text: '売上金額', value: 'sales', align: 'right' },
        { text: '締日', value: 'dateDeadline' },
      ],
    }
  },
}
</script>

<template>
  <a-data-table v-bind="$attrs" :headers="headers" v-on="$listeners">
    <template #[`item.resultType`]="{ item }">
      {{ $COLLECTION_RESULT_TYPE[item.resultType] }}
    </template>
    <template #[`item.municipalWeight`]="{ item }">
      {{ `${$airNumericToSeparatedString(item.municipalWeight, 2)} kg` }}
    </template>
    <template #[`item.industrialWeight`]="{ item }">
      {{ `${$airNumericToSeparatedString(item.industrialWeight, 2)} kg` }}
    </template>
    <template #[`item.sales`]="{ item }">
      {{ `${$airNumericToSeparatedString(item.sales, 2)} 円` }}
    </template>
  </a-data-table>
</template>

<style></style>
