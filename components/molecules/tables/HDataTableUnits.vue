<script>
/**
 * ### HDataTableUnits
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
        if (item.abbr.includes(search)) return true
        return false
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
  <h-data-table
    v-bind="$attrs"
    :custom-filter="customFilter"
    :headers="headers"
    sort-by="code"
    v-on="$listeners"
  >
  </h-data-table>
</template>

<style></style>
