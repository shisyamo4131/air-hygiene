<script>
/**
 * ### HInputSiteUnitPrice
 *
 * @author shisyamo4131
 */
import HInputSiteUnitPriceDetails from './HInputSiteUnitPriceDetails.vue'
import Mixin from '~/components/molecules/inputs/HMixinInput.vue'
import ATextFieldDate from '~/components/atoms/inputs/ATextFieldDate.vue'
export default {
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: {
    HInputSiteUnitPriceDetails,
    ATextFieldDate,
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
    <a-text-field-date
      label="開始日"
      :value="date"
      required
      @input="$emit('update:date', $event)"
    />
    <h-input-site-unit-price-details
      :value="details"
      @input="$emit('update:details', $event)"
    />
  </div>
</template>

<style></style>
