<script>
import ADataTable from '~/components/atoms/tables/ADataTable.vue'
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
      headers: [
        { text: '回収品目', value: 'itemId' },
        { text: '金額', value: 'price', align: 'right' },
      ],
    }
  },
}
</script>

<template>
  <a-data-table
    v-bind="$attrs"
    item-key="key"
    :headers="headers"
    v-on="$listeners"
  >
    <template #[`item.itemId`]="{ item }">
      {{ $store.getters['masters/Item'](item.itemId)?.abbr || 'undefined' }}
    </template>
    <template #[`item.price`]="{ item }">
      {{
        `${(item?.price || 0).toFixed(2)}円/${
          $store.getters['masters/Unit'](item.unitId)?.name || 'undefined'
        }`
      }}
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
