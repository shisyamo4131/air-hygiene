<script>
/**
 * ### HPageIndex
 *
 * @author shisyamo4131
 */
import ADataTableCollectionResults from '../atoms/tables/ADataTableCollectionResults.vue'
import HDataTableCollectItems from '../molecules/tables/HDataTableCollectItems.vue'
import HDataTableCustomers from '../molecules/tables/HDataTableCustomers.vue'
import HDataTableSites from '../molecules/tables/HDataTableSites.vue'
import HDataTableUnits from '../molecules/tables/HDataTableUnits.vue'
import HTemplateIndex from './HTemplateIndex.vue'
export default {
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: {
    HTemplateIndex,
    ADataTableCollectionResults,
    HDataTableCollectItems,
    HDataTableCustomers,
    HDataTableSites,
    HDataTableUnits,
  },
  /******************************************************************
   * PROPS
   ******************************************************************/
  props: {
    collection: { type: String, default: undefined, required: false },
  },
  /******************************************************************
   * DATA
   ******************************************************************/
  data() {
    return {
      collections: {
        CollectionResults: {
          label: '回収実績管理',
          component: 'ADataTableCollectionResults',
        },
        CollectItems: {
          label: '回収品目管理',
          component: 'HDataTableCollectItems',
        },
        Customers: {
          label: '取引先管理',
          component: 'HDataTableCustomers',
        },
        Sites: {
          label: '排出場所管理',
          component: 'HDataTableSites',
        },
        Units: {
          label: '単位管理',
          component: 'HDataTableUnits',
        },
      },
    }
  },
  /******************************************************************
   * COMPUTED
   ******************************************************************/
  computed: {
    label() {
      if (!this.collection) return undefined
      return this.collections[this.collection]?.label || undefined
    },
    component() {
      if (!this.collection) return undefined
      return this.collections[this.collection]?.component || undefined
    },
  },
}
</script>

<template>
  <h-template-index v-bind="$attrs" :label="label" v-on="$listeners">
    <template #default="{ attrs, on }">
      <component :is="component" v-bind="attrs" v-on="on" />
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
  </h-template-index>
</template>

<style></style>
