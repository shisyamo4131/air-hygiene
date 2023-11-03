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
   * DATA
   ******************************************************************/
  data() {
    return {
      headers: [
        { text: '回収品目', value: 'collectItemId' },
        { text: '数量', value: 'amount', align: 'right', sortable: false },
        { text: '単位', value: 'unitId', align: 'center', sortable: false },
        { text: '単価', value: 'unitPrice', align: 'right', sortable: false },
        { text: '金額', value: 'price', align: 'right', sortable: false },
      ],
    }
  },
  /******************************************************************
   * METHODS
   ******************************************************************/
  methods: {
    collectItem(id) {
      const item = this.$store.getters['masters/CollectItem'](id)
      return item
    },
    unit(id) {
      const item = this.$store.getters['masters/Unit'](id)
      return item
    },
  },
}
</script>

<template>
  <a-data-table v-bind="$attrs" :headers="headers" v-on="$listeners">
    <template #[`item.collectItemId`]="{ item }">
      {{ collectItem(item.collectItemId)?.abbr || 'undefined' }}
    </template>
    <template #[`item.unitId`]="{ item }">
      {{ unit(item.unitId)?.abbr || 'undefined' }}
    </template>
    <template #[`item.amount`]="{ item }">
      {{ `${(item?.amount || 0).toFixed(2)}` }}
    </template>
    <template #[`item.unitPrice`]="{ item }">
      {{ `${(item?.unitPrice || 0).toFixed(2)} 円` }}
    </template>
    <template #[`item.price`]="{ item }">
      {{ `${(item?.price || 0).toFixed(2)} 円` }}
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
