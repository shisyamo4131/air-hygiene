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
      <h-radio-group-edit-model v-model="editMode" row hide-details />
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
import HInputCustomer from '~/components/molecules/inputs/HInputCustomer.vue'
import HInputSite from '~/components/molecules/inputs/HInputSite.vue'
import HInputMunicipalContract from '~/components/molecules/inputs/HInputMunicipalContract.vue'
import HInputMunicipalPermission from '~/components/molecules/inputs/HInputMunicipalPermission.vue'
import HInputItemUnitPrice from '~/components/molecules/inputs/HInputItemUnitPrice.vue'
import HInputCollectionResult from '~/components/molecules/inputs/HInputCollectionResult.vue'
import HRadioGroupEditModel from '~/components/molecules/inputs/HRadioGroupEditModel.vue'
export default {
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: {
    HInputCustomer,
    HInputSite,
    HInputMunicipalContract,
    HInputMunicipalPermission,
    ASelect,
    HRadioGroupEditModel,
    HInputItemUnitPrice,
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
        'Customer',
        'Site',
        'Permission',
        'HInputMunicipalContract',
        'ItemUnitPrice',
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
