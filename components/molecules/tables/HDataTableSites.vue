<script>
/**
 * ### HDataTableSites
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
        { text: '排出場所名', value: 'name' },
        { text: '住所', value: 'address1' },
        { text: 'TEL/FAX', value: 'tel' },
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
    <template #[`item.address1`]="{ item }">
      <div>{{ item.address1 }}</div>
      <div class="text-caption grey--text">{{ item.address2 }}</div>
    </template>
    <template #[`item.tel`]="{ item }">
      <div>{{ item.tel }}</div>
      <div>{{ item.fax }}</div>
    </template>
  </h-data-table>
</template>

<style></style>
