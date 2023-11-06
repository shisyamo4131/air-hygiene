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
import MInputCollectItem from '~/components/molecules/inputs/MInputCollectItem.vue'
import MInputUnit from '~/components/molecules/inputs/MInputUnit.vue'
import MInputCustomer from '~/components/molecules/inputs/MInputCustomer.vue'
import MInputSite from '~/components/molecules/inputs/MInputSite.vue'
import MInputSiteUnitPrice from '~/components/molecules/inputs/MInputSiteUnitPrice.vue'
import MInputSiteUnitPriceDetail from '~/components/molecules/inputs/MInputSiteUnitPriceDetail.vue'
import MInputSiteMunicipalContract from '~/components/molecules/inputs/MInputSiteMunicipalContract.vue'
import MInputCollectionResultDetail from '~/components/molecules/inputs/MInputCollectionResultDetail.vue'
import MInputMunicipalPermission from '~/components/molecules/inputs/MInputMunicipalPermission.vue'
import MInputCollectionResult from '~/components/molecules/inputs/MInputCollectionResult.vue'
import ARadioGroupEditModel from '~/components/atoms/inputs/ARadioGroupEditModel.vue'
export default {
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: {
    MInputCollectItem,
    MInputUnit,
    MInputSiteUnitPriceDetail,
    MInputSiteUnitPrice,
    MInputCustomer,
    MInputSite,
    MInputSiteMunicipalContract,
    MInputCollectionResultDetail,
    MInputMunicipalPermission,
    ASelect,
    ARadioGroupEditModel,
    MInputCollectionResult,
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
        'MInputMunicipalContract',
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
      return `MInput${this.selectedModel}`
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
