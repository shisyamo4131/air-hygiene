<script>
/**
 * ### HDataTableAutonumbers
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
        if (item.collectionName.includes(search)) return true
        return false
      },
      headers: [
        { text: 'COLLECTION', value: 'collectionName' },
        { text: 'CURRENT', value: 'current' },
        { text: 'LENGTH', value: 'length' },
        { text: 'FIELD', value: 'field' },
        { text: 'STATUS', value: 'status' },
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
    sort-by="collectionName"
    v-on="$listeners"
  >
  </h-data-table>
</template>

<style></style>
