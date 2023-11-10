<script>
/**
 * ### HPageDetail
 *
 * @author shisyamo4131
 */
import HTemplateDefault from './HTemplateDefault.vue'
import HDashboardCollectItem from '~/components/organisms/HDashboardCollectItem.vue'
import HDashboardCustomer from '~/components/organisms/HDashboardCustomer.vue'
import HDashboardSite from '~/components/organisms/HDashboardSite.vue'
import HDashboardUnit from '~/components/organisms/HDashboardUnit.vue'
import HSimpleTableCollectItem from '~/components/molecules/tables/HSimpleTableCollectItem.vue'
import HSimpleTableCustomer from '~/components/molecules/tables/HSimpleTableCustomer.vue'
import HSimpleTableSite from '~/components/molecules/tables/HSimpleTableSite.vue'
import HSimpleTableUnit from '~/components/molecules/tables/HSimpleTableUnit.vue'
export default {
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: {
    HTemplateDefault,
    HDashboardCollectItem,
    HDashboardCustomer,
    HDashboardSite,
    HDashboardUnit,
    HSimpleTableCollectItem,
    HSimpleTableCustomer,
    HSimpleTableSite,
    HSimpleTableUnit,
  },
  /******************************************************************
   * PROPS
   ******************************************************************/
  props: {
    collection: { type: String, required: true },
    item: { type: Object, required: true },
  },
  /******************************************************************
   * DATA
   ******************************************************************/
  data() {
    return {
      collections: {
        CollectItems: {
          label: '回収品目詳細',
          tabs: [
            { text: 'Dashboard', component: 'HDashboardCollectItem' },
            { text: '登録情報', component: 'HSimpleTableCollectItem' },
          ],
        },
        Customers: {
          label: '取引先詳細',
          tabs: [
            { text: 'Dashboard', component: 'HDashboardCustomer' },
            { text: '登録情報', component: 'HSimpleTableCustomer' },
            { text: '排出場所', component: undefined },
            { text: '請求情報', component: undefined },
          ],
        },
        Sites: {
          label: '排出場所詳細',
          tabs: [
            { text: 'Dashboard', component: 'HDashboardSite' },
            { text: '登録情報', component: 'HSimpleTableSite' },
          ],
        },
        Units: {
          label: '単位詳細',
          tabs: [
            { text: 'Dashboard', component: 'HDashboardUnit' },
            { text: '登録情報', component: 'HSimpleTableUnit' },
          ],
        },
      },
      tabIndex: 0,
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
    tabs() {
      if (!this.collection) return []
      if (!(this.collections[this.collection]?.tabs || []).length) return []
      return this.collections[this.collection].tabs
    },
  },
}
</script>

<template>
  <h-template-default
    v-bind="$attrs"
    :label="label"
    itembar-dense
    show-itembar
    v-on="$listeners"
  >
    <template #prepend-toolbar>
      <v-icon left @click="$emit('click:back')">mdi-chevron-left</v-icon>
    </template>
    <template #append-toolbar>
      <v-icon @click="$emit('click:edit')">mdi-pencil</v-icon>
    </template>
    <template #itembar>
      <v-tabs v-model="tabIndex" fixed-tabs show-arrows>
        <v-tab v-for="(tab, index) of tabs" :key="index">{{ tab.text }}</v-tab>
      </v-tabs>
    </template>
    <template #default>
      <v-container fluid>
        <v-tabs-items v-model="tabIndex">
          <v-tab-item v-for="(tab, index) of tabs" :key="index">
            <component :is="tab.component" v-bind="item" />
          </v-tab-item>
        </v-tabs-items>
      </v-container>
    </template>
  </h-template-default>
</template>

<style></style>
