<script>
/**
 * ### HTemplateSiteDetail
 * 排出場所詳細ページです。
 *
 * #### PROPERTIES
 * | name           | type    | required  | remarks       |
 * | :---           | :---    | :---:     | :---          |
 * | model          | Object  | true      | this.$Site()  |
 * | siteUnitPrices | Array   | true      |               |
 *
 * @author shisyamo4131
 */
import ASimpleTableSite from '~/components/atoms/tables/ASimpleTableSite.vue'
import HCrudSiteMunicipalContracts from '~/components/organisms/HCrudSiteMunicipalContracts.vue'
import HCrudSiteUnitPrices from '~/components/organisms/HCrudSiteUnitPrices.vue'
import HDashboardSite from '~/components/organisms/HDashboardSite.vue'
export default {
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: {
    HDashboardSite,
    HCrudSiteUnitPrices,
    ASimpleTableSite,
    HCrudSiteMunicipalContracts,
  },
  /******************************************************************
   * PROPS
   ******************************************************************/
  props: {
    /* requires this.$Site() */
    model: { type: Object, required: true },
    siteUnitPrices: { type: Array, required: true },
  },
  /******************************************************************
   * DATA
   ******************************************************************/
  data() {
    return {
      tab: 0,
      tabs: ['Dashboard', '登録情報', '契約情報', '回収単価'],
      wasteDivTab: 0,
    }
  },
  /******************************************************************
   * MOUNTED
   ******************************************************************/
  mounted() {},
  /******************************************************************
   * DESTROYED
   ******************************************************************/
  destroyed() {},
  /******************************************************************
   * METHODS
   ******************************************************************/
  methods: {},
}
</script>

<template>
  <air-template-tabs
    :label="model.abbr"
    :overflow="tab === 2 ? 'scroll' : 'auto'"
    :tab.sync="tab"
    :tabs="tabs"
    :tabs-props="{ fixedTabs: true }"
    :show-itembar="tab === 2"
  >
    <template #prepend-label>
      <v-btn icon @click="$router.push(`/sites`)">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
    </template>
    <template #append-label>
      <v-btn icon @click="$router.push(`/sites/${model.docId}/edit`)">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
    </template>
    <template #itembar-items>
      <v-spacer />
      <v-btn-toggle v-model="wasteDivTab" dense color="secondary" mandatory>
        <v-btn> 一般廃棄物 </v-btn>
        <v-btn> 産業廃棄物 </v-btn>
      </v-btn-toggle>
    </template>
    <!-- TAB:0 DASHBOARD -->
    <template #tab-0>
      <v-container fluid>
        <h-dashboard-site :model="model" />
      </v-container>
    </template>
    <!-- TAB:1 SITE-INFORMATION -->
    <template #tab-1>
      <v-container fluid>
        <a-simple-table-site v-bind="model" />
      </v-container>
    </template>
    <!-- TAB:2 -->
    <template #tab-2>
      <v-container fluid>
        <v-window v-model="wasteDivTab">
          <v-window-item>
            <h-crud-site-municipal-contracts
              :site-id="model.docId"
              :items="[]"
            />
          </v-window-item>
          <v-window-item> aaa </v-window-item>
        </v-window>
      </v-container>
    </template>
    <!-- TAB3: SITE-UNIT-PRICES -->
    <template #tab-3>
      <v-container fluid>
        <h-crud-site-unit-prices
          :site-id="model.docId"
          :items="siteUnitPrices"
        />
      </v-container>
    </template>
  </air-template-tabs>
</template>

<style></style>
