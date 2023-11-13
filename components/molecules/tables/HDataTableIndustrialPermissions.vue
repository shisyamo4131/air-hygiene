<script>
/**
 * ### HDataTableIndustrialPermissions
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
        { text: '都道府県', value: 'prefCode' },
        { text: '許可番号', value: 'permitNumber' },
        { text: '許可区分', value: 'processingDiv' },
        { text: '許可日', value: 'dateOfPermission' },
        { text: '有効期限', value: 'dateOfExpiration' },
      ],
    }
  },
}
</script>

<template>
  <h-data-table v-bind="$attrs" :headers="headers" v-on="$listeners">
    <template #[`item.prefCode`]="{ item }">
      {{ `${$PREFECTURE[item.prefCode]}` }}
    </template>
    <template #[`item.processingDiv`]="{ item }">
      <div v-if="item.includeSpeciallyControled">
        {{ `${$PROCESSING_DIV[item.processingDiv]}(特管を含む)` }}
      </div>
      <div>
        {{ `${$PROCESSING_DIV[item.processingDiv]}` }}
      </div>
    </template>
  </h-data-table>
</template>

<style></style>
