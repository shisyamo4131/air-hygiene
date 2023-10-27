<script>
/**
 * ### HDataTableSiteunitPriceDetails
 * 排出場所の回収単価を一覧表示するためのDataTableコンポーネント。
 *
 * @author shisyamo4131
 */
import ADataTable from '~/components/atoms/tables/ADataTable.vue'
export default {
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: { ADataTable },
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
        { text: '回収品目', value: 'collectItem' },
        { text: '金額', value: 'unitPrice', align: 'right' },
      ],
    }
  },
  /******************************************************************
   * COMPUTED
   ******************************************************************/
  computed: {
    extendedItems() {
      return this.items.map((item) => {
        const collectItem =
          this.$store.getters['masters/CollectItem'](item.collectItemId) ||
          this.$CollectItem()
        const unit =
          this.$store.getters['masters/Unit'](item.unitId) || this.$Unit()
        return { ...item, collectItem, unit }
      })
    },
  },
}
</script>

<template>
  <a-data-table
    v-bind="$attrs"
    :headers="headers"
    :items="extendedItems"
    v-on="$listeners"
  >
    <template #[`item.collectItem`]="{ item }">
      {{ `[${item.collectItem.code}] ${item.collectItem.abbr}` }}
    </template>
    <template #[`item.unitPrice`]="{ item }">
      {{ `${(item?.unitPrice || 0).toFixed(2)}円/${item.unit.name}` }}
    </template>
    <template
      v-for="(_, scopedSlotName) in $scopedSlots"
      #[scopedSlotName]="slotData"
    >
      <slot :name="scopedSlotName" v-bind="slotData" />
    </template>
    <template v-for="(_, slotName) in $slots" #[slotName]>
      <slot :name="slotName" />
    </template>
  </a-data-table>
</template>

<style></style>
