<script>
/**
 * @author shisyamo4131
 */
import Mixin from '~/components/molecules/inputs/HInputMixin.vue'
import ATextarea from '~/components/atoms/inputs/ATextarea.vue'
import ATextFieldCollectItemCode from '~/components/atoms/inputs/ATextFieldCollectItemCode.vue'
import ATextFieldCollectItemName from '~/components/atoms/inputs/ATextFieldCollectItemName.vue'
import ATextFieldCollectItemNameKana from '~/components/atoms/inputs/ATextFieldCollectItemNameKana.vue'
import ATextFieldCollectItemAbbr from '~/components/atoms/inputs/ATextFieldCollectItemAbbr.vue'
import AAutocompleteWasteDiv from '~/components/atoms/inputs/AAutocompleteWasteDiv.vue'
export default {
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: {
    ATextarea,
    ATextFieldCollectItemCode,
    ATextFieldCollectItemName,
    ATextFieldCollectItemNameKana,
    ATextFieldCollectItemAbbr,
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
    <a-text-field-collect-item-code
      :value="code"
      required
      :disabled="editMode === 'UPDATE' && !deletable"
      @input="$emit('update:code', $event)"
    />
    <a-text-field-collect-item-name
      :value="name"
      required
      @input="$emit('update:name', $event)"
    />
    <a-text-field-collect-item-name-kana
      :value="nameKana"
      required
      @input="$emit('update:nameKana', $event)"
    />
    <a-text-field-collect-item-abbr
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
