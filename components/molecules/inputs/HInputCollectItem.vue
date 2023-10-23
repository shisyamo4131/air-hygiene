<script>
/**
 * @author shisyamo4131
 */
import ATextField from '~/components/atoms/inputs/ATextField.vue'
import Mixin from '~/components/molecules/inputs/HInputMixin.vue'
import ASelect from '~/components/atoms/inputs/ASelect.vue'
import ATextarea from '~/components/atoms/inputs/ATextarea.vue'
export default {
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: { ATextField, ASelect, ATextarea },
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
  /******************************************************************
   * WATCH
   ******************************************************************/
  watch: {},
  /******************************************************************
   * METHODS
   ******************************************************************/
  methods: {},
}
</script>

<template>
  <div>
    <a-text-field
      label="CODE"
      :value="code"
      counter
      hint="4桁で入力"
      maxlength="4"
      :rules="[(v) => !v || v.length === 4 || '4桁で入力してください。']"
      required
      :disabled="editMode === 'UPDATE' && !deletable"
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
      maxlength="4"
      counter
      hint="4文字以内"
      @input="$emit('update:abbr', $event)"
    />
    <a-select
      label="廃棄物区分"
      :value="wasteDiv"
      :items="$WASTE_DIV_ARRAY"
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
