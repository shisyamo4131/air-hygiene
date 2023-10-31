<script>
/**
 * ### HDataTableCollectionResultDetails
 *
 * Data table component for displaying CollectionResultDetails.
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
        { text: '数量', value: 'amount', align: 'right', sortable: false },
        { text: '単価', value: 'unitPrice', align: 'right', sortable: false },
        { text: '金額', value: 'price', align: 'right', sortable: false },
      ],
    }
  },
  /******************************************************************
   * COMPUTED
   ******************************************************************/
  computed: {
    extendedItems() {
      return this.items
        .map((item) => {
          const collectItem = this.$CollectItem()
          collectItem.initialize(
            this.$store.getters['masters/CollectItem'](item.collectItemId)
          )
          const unit = this.$Unit()
          unit.initialize(this.$store.getters['masters/Unit'](item.unitId))
          return {
            ...item,
            collectItem: `[${collectItem.code}] ${collectItem.abbr}`,
            unit,
          }
        })
        .sort((a, b) => {
          if (a.id < b.id) return -1
          if (a.id > b.id) return 1
          return 0
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
    <template #[`item.amount`]="{ item }">
      {{ `${(item?.amount || 0).toFixed(2)} ${item.unit.abbr}` }}
    </template>
    <template #[`item.unitPrice`]="{ item }">
      {{ `${(item?.unitPrice || 0).toFixed(2)} 円` }}
    </template>
    <template #[`item.price`]="{ item }">
      {{ `${(item?.price || 0).toFixed(2)} 円/${item.unit.abbr}` }}
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
