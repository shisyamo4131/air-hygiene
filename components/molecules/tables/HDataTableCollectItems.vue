<script>
/**
 * ### HDataTableCollectItems
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
      customFilter: (value, search, item) => {
        if (item.code.includes(search)) return true
        if (item.name.includes(search)) return true
        if (item.nameKana.includes(search)) return true
        if (item.abbr.includes(search)) return true
        return false
      },
      headers: [
        { text: 'CODE', value: 'code' },
        { text: '回収品目名', value: 'name' },
        { text: '区分', value: 'wasteDiv' },
      ],
    }
  },
}
</script>

<template>
  <h-data-table
    v-bind="$attrs"
    :custom-filter="customFilter"
    :headers="headers"
    sort-by="code"
    v-on="$listeners"
  >
    <template #[`item.wasteDiv`]="{ item }">
      {{ $WASTE_DIV[item.wasteDiv] }}
    </template>
  </h-data-table>
</template>

<style></style>
