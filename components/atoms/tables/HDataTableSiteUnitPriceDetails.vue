<script>
/**
 * ### HDataTableSiteunitPriceDetails
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
    headers: {
      type: Array,
      default: () => {
        return [
          { text: '回収品目', value: 'collectItemId' },
          { text: '金額', value: 'unitPrice', align: 'right' },
        ]
      },
    },
  },
  /******************************************************************
   * METHODS
   ******************************************************************/
  methods: {
    collectItem(item) {
      if (!item.collectItemId) return 'undefined'
      const collectItem = this.$store.getters['masters/CollectItem'](
        item.collectItemId
      )
      if (!collectItem) return 'undefined'
      return `[${collectItem.code}] ${collectItem.abbr}`
    },
    unitPrice(item) {
      if (!item.unitId) return 'undefined'
      const unit = this.$store.getters['masters/Unit'](item.unitId)
      if (!unit) return 'undefined'
      return `${(item?.unitPrice || 0).toFixed(2)}円/${unit.abbr}`
    },
  },
}
</script>

<template>
  <a-data-table v-bind="{ ...$props, ...$attrs }" v-on="$listeners">
    <template #[`item.collectItemId`]="{ item }">
      {{ collectItem(item) }}
    </template>
    <template #[`item.unitPrice`]="{ item }">
      {{ unitPrice(item) }}
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
