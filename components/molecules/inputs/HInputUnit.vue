<script>
/**
 * @author shisyamo4131
 */
import ATextFieldUnitAbbr from '~/components/atoms/inputs/ATextFieldUnitAbbr.vue'
import ATextFieldUnitCode from '~/components/atoms/inputs/ATextFieldUnitCode.vue'
import ATextFieldUnitName from '~/components/atoms/inputs/ATextFieldUnitName.vue'
import Mixin from '~/components/molecules/inputs/HInputMixin.vue'
export default {
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: {
    ATextFieldUnitCode,
    ATextFieldUnitName,
    ATextFieldUnitAbbr,
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
    <a-text-field-unit-code
      :value="code"
      required
      :disabled="editMode === 'UPDATE' && !deletable"
      @input="$emit('update:code', $event)"
    />
    <a-text-field-unit-name
      :value="name"
      required
      @input="$emit('update:name', $event)"
    />
    <a-text-field-unit-abbr
      :value="abbr"
      required
      @input="$emit('update:abbr', $event)"
    />
  </div>
</template>

<style></style>
