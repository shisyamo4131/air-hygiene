<script>
/**
 * @author shisyamo4131
 */
import ATextField from '~/components/atoms/inputs/ATextField.vue'
import Mixin from '~/components/molecules/inputs/HInputMixin.vue'
import HCrudItemUnitPrices from '~/components/organisms/HCrudItemUnitPrices.vue'
export default {
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: {
    ATextField,
    HCrudItemUnitPrices,
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
    prices: { type: Array, default: () => [], required: false },
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
    <h-crud-item-unit-prices
      :value="prices"
      :edit-mode="editMode"
      @input="$emit('update:prices', $event)"
    />
  </div>
</template>

<style></style>
