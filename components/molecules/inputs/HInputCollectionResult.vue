<script>
/**
 * @author shisyamo4131
 */
import HAutocompleteSite from './HAutocompleteSite.vue'
import HAutocompleteCollectItem from './HAutocompleteCollectItem.vue'
import HAutocompleteUnit from './HAutocompleteUnit.vue'
import HNumericUnitPrice from './HNumericUnitPrice.vue'
import ATextarea from '~/components/atoms/inputs/ATextarea.vue'
import Mixin from '~/components/molecules/inputs/HInputMixin.vue'
import ATextField from '~/components/atoms/inputs/ATextField.vue'
export default {
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: {
    ATextField,
    ATextarea,
    HAutocompleteSite,
    HAutocompleteCollectItem,
    HAutocompleteUnit,
    HNumericUnitPrice,
  },
  /******************************************************************
   * MIXINS
   ******************************************************************/
  mixins: [Mixin],
  /******************************************************************
   * PROPS
   ******************************************************************/
  props: {
    date: { type: String, default: '', required: false },
    siteId: { type: String, default: '', required: false },
    collectItemId: { type: String, default: '', required: false },
    unitId: { type: String, default: '', required: false },
    unitPrice: { type: Number, default: null, required: false },
    remarks: { type: String, default: '', required: false },
  },
  /******************************************************************
   * WATCH
   ******************************************************************/
  watch: {},
}
</script>

<template>
  <div>
    <a-text-field
      label="回収日"
      :value="date"
      required
      input-type="date"
      @input="$emit('update:date', $event)"
    />
    <h-autocomplete-site
      label="排出場所"
      :value="siteId"
      required
      @input="$emit('update:siteId', $event)"
    />
    <h-autocomplete-collect-item
      label="回収品目"
      :value="collectItemId"
      required
      @input="$emit('update:collectItemId', $event)"
    />
    <h-autocomplete-unit
      label="単位"
      :value="unitId"
      required
      @input="$emit('update:unitId', $event)"
    />
    <h-numeric-unit-price
      label="単価（税抜）"
      :value="unitPrice"
      required
      :unit-id="unitId"
      @input="$emit('update:unitPrice', $event)"
    />
    <a-textarea
      label="備考"
      :value="remarks"
      @input="$emit('update:remarks', $event)"
    />
  </div>
</template>

<style></style>
