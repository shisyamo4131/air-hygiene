<script>
/**
 * @author shisyamo4131
 */
import HCrudSiteMunicipalContract from '~/components/organisms/HCrudSiteMunicipalContract.vue'
import HDashboardSite from '~/components/organisms/HDashboardSite.vue'
import HDetailSite from '~/components/organisms/HDetailSite.vue'
import HTimelineSiteUnitPrices from '~/components/organisms/HTimelineSiteUnitPrices.vue'
export default {
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: {
    HCrudSiteMunicipalContract,
    HDashboardSite,
    HDetailSite,
    HTimelineSiteUnitPrices,
  },
  /******************************************************************
   * PROPS
   ******************************************************************/
  props: {
    /* requires this.$Site() */
    model: { type: Object, required: true },
    municipalContracts: { type: Array, required: true },
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
   * COMPUTED
   ******************************************************************/
  computed: {
    sortedMunicipalContracts() {
      const result = this.municipalContracts
        .map((item) => item)
        .sort((a, b) => {
          if (a.date < b.date) return 1
          if (a.date > b.date) return -1
          return 0
        })
      return result
    },
    sortedUnitPrices() {
      const result = this.siteUnitPrices
        .map((item) => item)
        .sort((a, b) => {
          if (a.date < b.date) return 1
          if (a.date > b.date) return -1
          return 0
        })
      return result
    },
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
    :tabs-props="{ grow: true }"
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
    <template #tab-0>
      <v-container fluid>
        <h-dashboard-site :model="model" />
      </v-container>
    </template>
    <template #tab-1>
      <v-container fluid>
        <h-detail-site :model="model" />
      </v-container>
    </template>
    <template #tab-2>
      <v-container fluid>
        <v-window v-model="wasteDivTab">
          <v-window-item>
            <v-timeline align-top :dense="$vuetify.breakpoint.mobile">
              <v-timeline-item>
                <h-crud-site-municipal-contract
                  outlined
                  :site-id="model.docId"
                  edit-mode="REGIST"
                />
              </v-timeline-item>
              <v-timeline-item
                v-for="(contract, index) of sortedMunicipalContracts"
                :key="index"
              >
                <h-crud-site-municipal-contract
                  outlined
                  :site-id="model.docId"
                  :model="contract"
                  edit-mode="UPDATE"
                />
              </v-timeline-item>
            </v-timeline>
          </v-window-item>
          <v-window-item> aaa </v-window-item>
        </v-window>
      </v-container>
    </template>
    <template #tab-3>
      <v-container fluid>
        <h-timeline-site-unit-prices :model="model" />
      </v-container>
    </template>
  </air-template-tabs>
</template>

<style></style>
