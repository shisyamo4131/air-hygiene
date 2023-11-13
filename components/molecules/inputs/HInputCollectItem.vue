<script>
/**
 * @author shisyamo4131
 */
import Mixin from '~/components/molecules/inputs/HMixinInput.vue'
import ATextarea from '~/components/atoms/inputs/ATextarea.vue'
import AAutocomplete from '~/components/atoms/inputs/AAutocomplete.vue'
import ATextField from '~/components/atoms/inputs/ATextField.vue'
export default {
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: {
    ATextarea,
    AAutocomplete,
    ATextField,
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
  /******************************************************************
   * DATA
   ******************************************************************/
  data() {
    return {
      rules: {
        length: (v) => /^\d{4}$/.test(v) || '半角数字4桁で入力',
        duplicated: (v) =>
          this.editMode !== 'REGIST' ||
          !this.duplicated ||
          '既に使わているCODEです。',
      },
    }
  },
}
</script>

<template>
  <div>
    <a-text-field
      label="CODE"
      :value="code"
      required
      :disabled="editMode !== 'REGIST'"
      counter
      hint="4桁で入力"
      max-length="4"
      :rules="[rules.length, rules.duplicated]"
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
      :disabled="!deletable"
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
