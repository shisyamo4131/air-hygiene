<script>
/**
 * ### HDataTableCustomers
 *
 * @author shisyamo4131
 */
import HDataTable from './HDataTable.vue'
import ASwitch from '~/components/atoms/inputs/ASwitch.vue'
export default {
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: { ASwitch, HDataTable },
  /******************************************************************
   * PROPS
   ******************************************************************/
  props: {
    items: { type: Array, default: () => [], required: false },
  },
  /******************************************************************
   * DATA
   ******************************************************************/
  data() {
    return {
      customFilter: (value, search, item) => {
        if (item.code.includes(search)) return true
        if (item.name1.includes(search)) return true
        if (item.abbr.includes(search)) return true
        if (item.abbrKana.includes(search)) return true
        return false
      },
      headers: [
        { text: 'CODE', value: 'code' },
        { text: '取引先名', value: 'name1' },
        { text: '住所', value: 'address1' },
        { text: 'TEL/FAX', value: 'tel' },
        { text: '状態', value: 'status' },
      ],
      includeExpired: false,
    }
  },
  /******************************************************************
   * COMPUTED
   ******************************************************************/
  computed: {
    internalItems() {
      return this.items.filter(({ status }) => {
        if (this.includeExpired) return true
        return status === 'active'
      })
    },
  },
}
</script>

<template>
  <h-data-table
    v-bind="$attrs"
    :custom-filter="customFilter"
    :headers="headers"
    :items="internalItems"
    sort-by="code"
    sort-desc
    v-on="$listeners"
  >
    <template #append-search>
      <a-switch
        v-model="includeExpired"
        class="ml-4"
        hide-details
        label="契約満了を含める"
      />
    </template>
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
    <template #[`item.status`]="{ item }">
      <v-chip v-if="item.status === 'active'" small>{{
        $CUSTOMER_STATUS[item.status]
      }}</v-chip>
      <v-chip v-else small>{{ $CUSTOMER_STATUS[item.status] }}</v-chip>
    </template>
  </h-data-table>
</template>

<style></style>
