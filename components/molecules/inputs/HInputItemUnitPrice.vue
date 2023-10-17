<script>
import HAutocompleteItem from './HAutocompleteItem.vue'
import HAutocompleteUnit from './HAutocompleteUnit.vue'
import HNumericUnitPrice from './HNumericUnitPrice.vue'
export default {
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: { HAutocompleteItem, HAutocompleteUnit, HNumericUnitPrice },
  /******************************************************************
   * PROPS
   ******************************************************************/
  props: {
    itemId: { type: String, default: '', required: false },
    unitId: { type: String, default: '', required: false },
    price: { type: Number, default: null, required: false },
  },
}
</script>

<template>
  <div>
    <h-autocomplete-item
      label="回収品目"
      :value="itemId"
      required
      @input="$emit('update:itemId', $event)"
    />
    <v-row dense>
      <v-col cols="12" sm="6">
        <h-autocomplete-unit
          label="単位"
          :value="unitId"
          required
          @input="$emit('update:unitId', $event)"
        />
      </v-col>
      <v-col cols="12" sm="6">
        <h-numeric-unit-price
          label="単価"
          :value="price"
          required
          :unit-id="unitId"
          @input="$emit('update:price', $event)"
        />
      </v-col>
    </v-row>
  </div>
</template>

<style></style>
