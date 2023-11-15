<script>
/**
 * ### HDataTableCollectionResults
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
        { text: '回収日', value: 'date' },
        { text: '実績区分', value: 'resultType' },
        { text: '回収ルート', value: 'rootId' },
        {
          text: '一廃重量',
          value: 'municipalWeight',
          align: 'right',
          sortable: false,
        },
        {
          text: '産廃重量',
          value: 'industrialWeight',
          align: 'right',
          sortable: false,
        },
        { text: '売上金額', value: 'sales', align: 'right', sortable: false },
        { text: '請求締日', value: 'dateDeadline' },
      ],
    }
  },
}
</script>

<template>
  <h-data-table v-bind="$attrs" :headers="headers" v-on="$listeners">
    <template #[`item.resultType`]="{ item }">
      {{ $COLLECTION_RESULT_TYPE[item.resultType] }}
    </template>
    <template #[`item.municipalWeight`]="{ item }">
      {{ `${$airNumericToSeparatedString(item?.municipalWeight || 0)}kg` }}
    </template>
    <template #[`item.industrialWeight`]="{ item }">
      {{ `${$airNumericToSeparatedString(item?.industrialWeight || 0)}kg` }}
    </template>
    <template #[`item.sales`]="{ item }">
      {{ `${$airNumericToSeparatedString(item?.sales || 0)}円` }}
    </template>
  </h-data-table>
</template>

<style></style>
