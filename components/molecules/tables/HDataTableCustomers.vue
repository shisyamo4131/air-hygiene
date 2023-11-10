<script>
/**
 * ### HDataTableCustomers
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
        if (item.name1.includes(search)) return true
      },
      headers: [
        { text: 'CODE', value: 'code' },
        { text: '取引先名', value: 'name1' },
        { text: '住所', value: 'address1' },
        { text: 'TEL/FAX', value: 'tel' },
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
    <template #[`item.name1`]="{ item }">
      <div>{{ item.name1 }}</div>
      <div class="text-caption grey--text">{{ item.name2 }}</div>
    </template>
    <template #[`item.address1`]="{ item }">
      <div>{{ item.address1 }}</div>
      <div class="text-caption grey--text">{{ item.address2 }}</div>
    </template>
    <template #[`item.tel`]="{ item }">
      <div>{{ item.tel }}</div>
      <div>{{ item.fax }}</div>
    </template>
  </a-data-table>
</template>

<style></style>
