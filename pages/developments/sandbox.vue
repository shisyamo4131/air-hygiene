<template>
  <div>
    <h-template-array-input
      v-model="items"
      model="SiteUnitPriceDetail"
      :dialog-props="{ maxWidth: 480 }"
    >
      <template #default="{ attrs, on }">
        <h-input v-bind="attrs" v-on="on" />
      </template>
      <template #data-table="{ attrs, on }">
        <h-data-table v-bind="attrs" v-on="on" />
      </template>
    </h-template-array-input>
  </div>
</template>

<script>
import TestData from '~/assets/TestDataSiteUnitPriceDetails.json'
import HInput from '~/components/molecules/inputs/HInputSiteUnitPriceDetail.vue'
import HDataTable from '~/components/molecules/tables/HDataTableSiteUnitPriceDetails.vue'
import HTemplateArrayInput from '~/components/templates/HTemplateArrayInput.vue'
export default {
  components: { HTemplateArrayInput, HDataTable, HInput },
  data() {
    return {
      items: TestData,
    }
  },
  methods: {},
}
</script>

<style></style>
