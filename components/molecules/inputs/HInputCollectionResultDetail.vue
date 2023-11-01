<script>
/**
 * ### HInputCollectionResultDetail
 *
 * @author shisyamo4131
 */
import HAutocompleteCollectItem from '../../atoms/inputs/HAutocompleteCollectItem.vue'
import HAutocompleteUnit from '../../atoms/inputs/HAutocompleteUnit.vue'
import HNumericUnitPrice from '../../atoms/inputs/HNumericUnitPrice.vue'
import Mixin from '~/components/molecules/inputs/HInputMixin.vue'
import HNumericAmount from '~/components/atoms/inputs/HNumericAmount.vue'
export default {
  /***************************************************************************
   * COMPONENTS
   ***************************************************************************/
  components: {
    HAutocompleteCollectItem,
    HAutocompleteUnit,
    HNumericUnitPrice,
    HNumericAmount,
  },
  /***************************************************************************
   * MIXINS
   ***************************************************************************/
  mixins: [Mixin],
  /***************************************************************************
   * PROPS
   ***************************************************************************/
  props: {
    collectItemId: { type: String, default: '', required: false },
    unitId: { type: String, default: '', required: false },
    amount: { type: Number, default: null, required: false },
    unitPrice: { type: Number, default: null, required: false },
    loadingUnitPrice: { type: Boolean, default: false, required: false },
  },
}
</script>

<template>
  <div>
    <h-autocomplete-collect-item
      label="回収品目"
      :value="collectItemId"
      required
      :disabled="editMode !== 'REGIST'"
      @change="$emit('change:collectItemId', $event)"
      @input="$emit('update:collectItemId', $event)"
    />
    <h-numeric-amount
      label="数量"
      :value="amount"
      required
      @input="$emit('update:amount', $event)"
    />
    <h-autocomplete-unit
      label="単位"
      :value="unitId"
      required
      :disabled="editMode !== 'REGIST'"
      @change="$emit('change:unitId', $event)"
      @input="$emit('update:unitId', $event)"
    />
    <h-numeric-unit-price
      label="単価（税抜）"
      :value="unitPrice"
      required
      :unit-id="unitId"
      :loading="loadingUnitPrice"
      @input="$emit('update:unitPrice', $event)"
    />
  </div>
</template>

<style></style>
