<script>
/**
 * ### HDataTableCollectItems
 *
 * @author shisyamo4131
 */
import ADataTable from '../../atoms/tables/ADataTable.vue'
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
      customFilter: (value, search, item) => {
        if (item.code.includes(search)) return true
        if (item.name.includes(search)) return true
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
  <a-data-table
    v-bind="$attrs"
    :custom-filter="customFilter"
    :headers="headers"
    v-on="$listeners"
  >
    <template #[`item.wasteDiv`]="{ item }">
      {{ $WASTE_DIV[item.wasteDiv] }}
    </template>
  </a-data-table>
</template>

<style></style>
