<script>
/**
 * @author shisyamo4131
 */
import AAutocompleteCollectItem from '../../atoms/inputs/AAutocompleteCollectItem.vue'
import AAutocompleteUnit from '../../atoms/inputs/AAutocompleteUnit.vue'
import ANumericUnitPrice from '../../atoms/inputs/ANumericUnitPrice.vue'
import Mixin from '~/components/molecules/inputs/HInputMixin.vue'
export default {
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: {
    AAutocompleteCollectItem,
    AAutocompleteUnit,
    ANumericUnitPrice,
  },
  /******************************************************************
   * MIXINS
   ******************************************************************/
  mixins: [Mixin],
  /******************************************************************
   * PROPS
   ******************************************************************/
  props: {
    collectItemId: { type: String, default: '', required: false },
    unitId: { type: String, default: '', required: false },
    unitPrice: { type: Number, default: null, required: false },
  },
}
</script>

<template>
  <div>
    <a-autocomplete-collect-item
      label="回収品目"
      :value="collectItemId"
      required
      :disabled="editMode !== 'REGIST'"
      @input="$emit('update:collectItemId', $event)"
    />
    <v-row dense>
      <v-col cols="12" sm="6">
        <a-autocomplete-unit
          label="単位"
          :value="unitId"
          required
          :disabled="editMode !== 'REGIST'"
          @input="$emit('update:unitId', $event)"
        />
      </v-col>
      <v-col cols="12" sm="6">
        <a-numeric-unit-price
          label="単価（税抜）"
          :value="unitPrice"
          required
          :unit-id="unitId"
          @input="$emit('update:unitPrice', $event)"
        />
      </v-col>
    </v-row>
  </div>
</template>

<style></style>
