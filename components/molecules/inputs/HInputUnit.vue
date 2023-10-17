<script>
/**
 * @create 2023-10-06
 * @author shisyamo4131
 */
import ATextField from '~/components/atoms/inputs/ATextField.vue'
import Mixin from '~/components/molecules/inputs/HInputMixin.vue'
export default {
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: { ATextField },
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
      hint="2桁で入力"
      maxlength="2"
      :rules="[(v) => !v || v.length === 2 || '2桁で入力してください。']"
      required
      :disabled="editMode === 'UPDATE' && !deletable"
      @input="$emit('update:code', $event)"
    />
    <a-text-field
      label="単位"
      :value="name"
      required
      @input="$emit('update:name', $event)"
    />
    <a-text-field
      label="略称"
      :value="abbr"
      required
      maxlength="3"
      counter
      hint="3文字以内"
      @input="$emit('update:abbr', $event)"
    />
  </div>
</template>

<style></style>
