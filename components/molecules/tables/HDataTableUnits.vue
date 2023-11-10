<script>
/**
 * ### HDataTableUnits
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
        { text: '単位名', value: 'name' },
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
  </a-data-table>
</template>

<style></style>
