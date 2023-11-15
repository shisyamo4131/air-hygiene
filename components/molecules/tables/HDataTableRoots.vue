<script>
/**
 * ### HDataTableRoots
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
      headers: [
        { text: 'CODE', value: 'code' },
        { text: '回収ルート名', value: 'name' },
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
    :headers="headers"
    :items="internalItems"
    v-on="$listeners"
  >
    <template #append-search>
      <a-switch
        v-model="includeExpired"
        class="ml-4"
        hide-details
        label="稼働終了を含める"
      />
    </template>
  </h-data-table>
</template>

<style></style>
