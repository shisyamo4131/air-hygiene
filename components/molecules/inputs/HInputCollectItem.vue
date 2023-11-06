<script>
/**
 * @author shisyamo4131
 */
import Mixin from '~/components/molecules/inputs/HInputMixin.vue'
import ATextarea from '~/components/atoms/inputs/ATextarea.vue'
import HTextFieldCollectItemCode from '~/components/atoms/inputs/HTextFieldCollectItemCode.vue'
import HTextFieldCollectItemName from '~/components/atoms/inputs/HTextFieldCollectItemName.vue'
import HTextFieldCollectItemNameKana from '~/components/atoms/inputs/HTextFieldCollectItemNameKana.vue'
import HTextFieldCollectItemAbbr from '~/components/atoms/inputs/HTextFieldCollectItemAbbr.vue'
import AAutocompleteWasteDiv from '~/components/atoms/inputs/AAutocompleteWasteDiv.vue'
export default {
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: {
    ATextarea,
    HTextFieldCollectItemCode,
    HTextFieldCollectItemName,
    HTextFieldCollectItemNameKana,
    HTextFieldCollectItemAbbr,
    AAutocompleteWasteDiv,
  },
  /******************************************************************
   * MIXINS
   ******************************************************************/
  mixins: [Mixin],
  /******************************************************************
   * PROPS
   ******************************************************************/
  props: {
    code: { type: String, default: '', required: false },
    name: { type: String, default: '', required: false },
    nameKana: { type: String, default: '', required: false },
    abbr: { type: String, default: '', required: false },
    wasteDiv: { type: String, default: '', required: false },
    remarks: { type: String, default: '', required: false },
    deletable: { type: Boolean, default: true, required: false },
  },
}
</script>

<template>
  <div>
    <h-text-field-collect-item-code
      :value="code"
      required
      :disabled="editMode === 'UPDATE' && !deletable"
      @input="$emit('update:code', $event)"
    />
    <h-text-field-collect-item-name
      :value="name"
      required
      @input="$emit('update:name', $event)"
    />
    <h-text-field-collect-item-name-kana
      :value="nameKana"
      required
      @input="$emit('update:nameKana', $event)"
    />
    <h-text-field-collect-item-abbr
      :value="abbr"
      required
      @input="$emit('update:abbr', $event)"
    />
    <a-autocomplete-waste-div
      :value="wasteDiv"
      required
      :disabled="editMode === 'UPDATE' && !deletable"
      @input="$emit('update:wasteDiv', $event)"
    />
    <a-textarea
      label="備考"
      :value="remarks"
      @input="$emit('update:remarks', $event)"
    />
  </div>
</template>

<style></style>
