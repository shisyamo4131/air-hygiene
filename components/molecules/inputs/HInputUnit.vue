<script>
/**
 * @author shisyamo4131
 */
import HTextFieldUnitAbbr from '~/components/atoms/inputs/HTextFieldUnitAbbr.vue'
import HTextFieldUnitCode from '~/components/atoms/inputs/HTextFieldUnitCode.vue'
import HTextFieldUnitName from '~/components/atoms/inputs/HTextFieldUnitName.vue'
import Mixin from '~/components/molecules/inputs/HInputMixin.vue'
export default {
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: {
    HTextFieldUnitCode,
    HTextFieldUnitName,
    HTextFieldUnitAbbr,
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
    <h-text-field-unit-code
      :value="code"
      required
      :disabled="editMode === 'UPDATE' && !deletable"
      @input="$emit('update:code', $event)"
    />
    <h-text-field-unit-name
      :value="name"
      required
      @input="$emit('update:name', $event)"
    />
    <h-text-field-unit-abbr
      :value="abbr"
      required
      @input="$emit('update:abbr', $event)"
    />
  </div>
</template>

<style></style>
