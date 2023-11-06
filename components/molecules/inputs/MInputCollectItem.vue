<script>
/**
 * @author shisyamo4131
 */
import Mixin from '~/components/molecules/mixins/MMixinInput.vue'
import ATextarea from '~/components/atoms/inputs/ATextarea.vue'
import AAutocomplete from '~/components/atoms/inputs/AAutocomplete.vue'
export default {
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: {
    ATextarea,
    AAutocomplete,
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
    <a-text-field
      label="CODE"
      :value="code"
      required
      :disabled="editMode === 'UPDATE' && !deletable"
      counter
      hint="4桁で入力"
      max-length="4"
      :rules="[(v) => !v || v.length === 4 || '4桁で入力してください。']"
      @input="$emit('update:code', $event)"
    />
    <a-text-field
      label="回収品目名"
      :value="name"
      required
      @input="$emit('update:name', $event)"
    />
    <a-text-field
      label="回収品目名カナ"
      :value="nameKana"
      required
      input-type="katakana"
      @input="$emit('update:nameKana', $event)"
    />
    <a-text-field
      label="略称"
      :value="abbr"
      required
      hint="4文字以内"
      max-length="4"
      @input="$emit('update:abbr', $event)"
    />
    <a-autocomplete
      label="廃棄物区分"
      auto-select-fiest
      :items="$WASTE_DIV_ARRAY"
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
