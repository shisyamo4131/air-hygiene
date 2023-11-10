<template>
  <v-card height="100%">
    <v-toolbar>
      <a-select
        v-model="selectedModel"
        label="MODEL"
        :items="models"
        hide-details
        class="mr-4"
      />
      <a-radio-group-edit-model v-model="editMode" row hide-details />
    </v-toolbar>
    <v-card-text
      :style="`height: calc(100% - ${toolbarHeight}px)`"
      class="overflow-y-auto"
    >
      <v-row>
        <v-col>
          <component
            :is="component"
            v-if="selectedModel"
            v-bind.sync="model"
            :edit-mode="editMode"
          />
        </v-col>
        <v-col>
          <v-simple-table>
            <tbody>
              <tr v-for="(prop, index) of props" :key="index">
                <td>{{ prop }}</td>
                <td>{{ model[prop] }}</td>
              </tr>
            </tbody>
          </v-simple-table>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import ASelect from '~/components/atoms/inputs/ASelect.vue'
import HInputCollectItem from '~/components/molecules/inputs/HInputCollectItem.vue'
import HInputUnit from '~/components/molecules/inputs/HInputUnit.vue'
import HInputCustomer from '~/components/molecules/inputs/HInputCustomer.vue'
import HInputSite from '~/components/molecules/inputs/HInputSite.vue'
import HInputSiteUnitPrice from '~/components/molecules/inputs/HInputSiteUnitPrice.vue'
import HInputSiteUnitPriceDetail from '~/components/molecules/inputs/HInputSiteUnitPriceDetail.vue'
import HInputSiteMunicipalContract from '~/components/molecules/inputs/HInputSiteMunicipalContract.vue'
import HInputCollectionResultDetail from '~/components/molecules/inputs/HInputCollectionResultDetail.vue'
import HInputMunicipalPermission from '~/components/molecules/inputs/HInputMunicipalPermission.vue'
import HInputCollectionResult from '~/components/molecules/inputs/HInputCollectionResult.vue'
import ARadioGroupEditModel from '~/components/atoms/inputs/ARadioGroupEditModel.vue'
export default {
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: {
    HInputCollectItem,
    HInputUnit,
    HInputSiteUnitPriceDetail,
    HInputSiteUnitPrice,
    HInputCustomer,
    HInputSite,
    HInputSiteMunicipalContract,
    HInputCollectionResultDetail,
    HInputMunicipalPermission,
    ASelect,
    ARadioGroupEditModel,
    HInputCollectionResult,
  },
  /******************************************************************
   * DATA
   ******************************************************************/
  data() {
    return {
      editMode: 'REGIST',
      model: {},
      models: [
        'CollectItem',
        'Unit',
        'Customer',
        'Site',
        'SiteUnitPrice',
        'SiteUnitPriceDetail',
        'SiteMunicipalContract',
        'CollectionResultDetail',
        'Permission',
        'HInputMunicipalContract',
        'CollectionResult',
      ],
      selectedModel: '',
    }
  },
  /******************************************************************
   * COMPUTED
   ******************************************************************/
  computed: {
    component() {
      return `HInput${this.selectedModel}`
    },
    props() {
      return Object.keys(this.model)
    },
    toolbarHeight() {
      return this.$vuetify.breakpoint.mobile ? 56 : 64
    },
  },
  /******************************************************************
   * WATCH
   ******************************************************************/
  watch: {
    selectedModel: {
      handler(v) {
        if (!v) this.model = {}
        if (v) this.model = this[`$${v}`]()
      },
      immediate: true,
    },
  },
}
</script>

<style></style>
