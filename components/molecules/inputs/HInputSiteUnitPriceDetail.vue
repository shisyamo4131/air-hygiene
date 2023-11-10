<script>
/**
 * ### HInputSiteUnitPriceDetail
 *
 * - A component for inputs of SiteUnitPriceDetail.
 *
 * @author shisyamo4131
 */
import AAutocompleteCollectItem from '../../atoms/inputs/AAutocompleteCollectItem.vue'
import AAutocompleteUnit from '../../atoms/inputs/AAutocompleteUnit.vue'
import Mixin from '~/components/molecules/mixins/MMixinInput.vue'
import ANumeric from '~/components/atoms/inputs/ANumeric.vue'
export default {
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: {
    AAutocompleteCollectItem,
    AAutocompleteUnit,
    ANumeric,
  },
  /******************************************************************
   * MIXINS
   ******************************************************************/
  mixins: [Mixin],
  /******************************************************************
   * PROPS
   ******************************************************************/
  props: {
    collectItemId: { type: String, default: '', required: true },
    unitId: { type: String, default: '', required: true },
    unitPrice: { type: Number, default: null, required: true },
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
        <a-numeric
          label="単価（税抜）"
          class="right-input"
          :value="unitPrice"
          required
          suffix="円"
          @input="$emit('update:unitPrice', $event)"
        />
      </v-col>
    </v-row>
  </div>
</template>

<style></style>
