<script>
/**
 * ### HInputSiteUnitPrice
 *
 * @author shisyamo4131
 */
import HDataTableSiteUnitPriceDetails from '../tables/HDataTableSiteUnitPriceDetails.vue'
import HInputSiteUnitPriceDetail from './HInputSiteUnitPriceDetail.vue'
import Mixin from '~/components/molecules/inputs/HMixinInput.vue'
import HTemplateArrayInput from '~/components/templates/HTemplateArrayInput.vue'
import ADate from '~/components/atoms/inputs/ADate.vue'
export default {
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: {
    HTemplateArrayInput,
    HInputSiteUnitPriceDetail,
    HDataTableSiteUnitPriceDetails,
    ADate,
  },
  /******************************************************************
   * MIXINS
   ******************************************************************/
  mixins: [Mixin],
  /******************************************************************
   * PROPS
   ******************************************************************/
  props: {
    site: { type: Object, default: null, required: false },
    date: { type: String, default: '', required: false },
    details: { type: Array, default: () => [], required: false },
  },
}
</script>

<template>
  <div>
    <a-date
      label="開始日"
      :value="date"
      required
      @input="$emit('update:date', $event)"
    />
    <h-template-array-input
      :value="details"
      :dialog-props="{ maxWidth: 360 }"
      model="SiteUnitPriceDetail"
      @input="$emit('update:details', $event)"
    >
      <template #default="{ attrs, on }">
        <h-input-site-unit-price-detail v-bind="attrs" v-on="on" />
      </template>
      <template #data-table="{ attrs, on }">
        <h-data-table-site-unit-price-details
          v-bind="attrs"
          height="360"
          hide-pagination
          :items-per-page="-1"
          v-on="on"
        />
      </template>
    </h-template-array-input>
  </div>
</template>

<style></style>
