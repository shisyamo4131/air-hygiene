<script>
/**
 * @author shisyamo4131
 */
import HCardCrudMunicipalContract from '~/components/molecules/cards/HCardCrudMunicipalContract.vue'
import HCardCrudUnitPrice from '~/components/molecules/cards/HCardCrudUnitPrice.vue'
import HSimpleTableSite from '~/components/molecules/tables/HSimpleTableSite.vue'
export default {
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: {
    HCardCrudMunicipalContract,
    HSimpleTableSite,
    HCardCrudUnitPrice,
  },
  /******************************************************************
   * PROPS
   ******************************************************************/
  props: {
    model: { type: Object, required: true },
    municipalContracts: { type: Array, required: true },
    unitPrices: { type: Array, required: true },
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
      const result = this.unitPrices
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
        <v-row>
          <v-col cols="12">
            <v-card outlined>
              <v-card-title>{{ model.name }}</v-card-title>
              <v-card-subtitle>{{ model.customer.abbr }}</v-card-subtitle>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </template>
    <template #tab-1>
      <v-container fluid>
        <v-card outlined>
          <h-simple-table-site v-bind="model" />
          <v-divider v-if="model.remarks" />
          <v-card-text v-if="model.remarks">
            {{ model.remarks }}
          </v-card-text>
        </v-card>
      </v-container>
    </template>
    <template #tab-2>
      <v-container fluid>
        <v-window v-model="wasteDivTab">
          <v-window-item>
            <v-timeline align-top :dense="$vuetify.breakpoint.mobile">
              <v-timeline-item>
                <h-card-crud-municipal-contract
                  outlined
                  :site-id="model.docId"
                  edit-mode="REGIST"
                />
              </v-timeline-item>
              <v-timeline-item
                v-for="(contract, index) of sortedMunicipalContracts"
                :key="index"
              >
                <h-card-crud-municipal-contract
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
        <v-timeline align-top :dense="$vuetify.breakpoint.mobile">
          <v-timeline-item>
            <h-card-crud-unit-price
              outlined
              :site-id="model.docId"
              edit-mode="REGIST"
            />
          </v-timeline-item>
          <v-timeline-item
            v-for="(contract, index) of sortedUnitPrices"
            :key="index"
          >
            <h-card-crud-unit-price
              outlined
              :site-id="model.docId"
              :model="contract"
              edit-mode="UPDATE"
            />
          </v-timeline-item>
        </v-timeline>
      </v-container>
    </template>
  </air-template-tabs>
</template>

<style></style>
