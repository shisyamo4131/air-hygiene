<script>
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
        { text: '数量', value: 'amount', align: 'right' },
        { text: '金額', value: 'price', align: 'right' },
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
          return {
            ...item,
            collectItem: this.$store.getters['masters/CollectItem'](
              item.collectItemId
            ),
            unit: this.$store.getters['masters/Unit'](item.unitId),
          }
        })
        .sort((a, b) => {
          if (a.item.key < b.item.key) return -1
          if (a.item.key > b.item.key) return 1
          return 0
        })
    },
  },
}
</script>

<template>
  <a-data-table
    v-bind="$attrs"
    item-key="id"
    :items="extendedItems"
    disable-sort
    :headers="headers"
    v-on="$listeners"
  >
    <template #[`item.collectItem`]="{ item }">
      {{ `[${item.collectItem.code}] ${item.collectItem.abbr}` }}
    </template>
    <template #[`item.amount`]="{ item }">
      {{ `${item.amount.toFixed(2)} ${item.unit.abbr}` }}
    </template>
    <template #[`item.price`]="{ item }">
      {{ `${(item?.price || 0).toFixed(2)} 円/${item.unit.name}` }}
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
