<script>
/**
 * @author shisyamo4131
 */
import ATextField from '~/components/atoms/inputs/ATextField.vue'
import Mixin from '~/components/molecules/inputs/HMixinInput.vue'
export default {
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: {
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
    abbr: { type: String, default: '', required: false },
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
      counter
      :disabled="editMode === 'UPDATE' && !deletable"
      hint="2桁で入力"
      max-length="2"
      :rules="[(v) => !v || v.length === 2 || '2桁で入力してください。']"
      @input="$emit('update:code', $event)"
    />
    <a-text-field
      label="単位名"
      :value="name"
      required
      @input="$emit('update:name', $event)"
    />
    <a-text-field
      label="略称"
      :value="abbr"
      required
      counter
      hint="4文字以内"
      max-length="4"
      @input="$emit('update:abbr', $event)"
    />
  </div>
</template>

<style></style>
