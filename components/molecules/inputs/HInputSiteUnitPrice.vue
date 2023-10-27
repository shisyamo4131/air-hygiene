<script>
/**
 * @author shisyamo4131
 */
import HInputSiteUnitPriceDetails from './HInputSiteUnitPriceDetails.vue'
import ATextField from '~/components/atoms/inputs/ATextField.vue'
import Mixin from '~/components/molecules/inputs/HInputMixin.vue'
export default {
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: {
    ATextField,
    HInputSiteUnitPriceDetails,
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
    <a-text-field
      label="開始日"
      :value="date"
      required
      input-type="date"
      @input="$emit('update:date', $event)"
    />
    <h-input-site-unit-price-details
      :value="details"
      :edit-mode="editMode"
      @input="$emit('update:details', $event)"
    />
  </div>
</template>

<style></style>
