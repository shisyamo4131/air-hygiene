<script>
/**
 * ### HInputAutonumber
 *
 * @author shisyamo4131
 */
import ATextField from '~/components/atoms/inputs/ATextField.vue'
import Mixin from '~/components/molecules/inputs/HMixinInput.vue'
import ASwitch from '~/components/atoms/inputs/ASwitch.vue'
import ANumeric from '~/components/atoms/inputs/ANumeric.vue'
export default {
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: { ATextField, ASwitch, ANumeric },
  /******************************************************************
   * MIXINS
   ******************************************************************/
  mixins: [Mixin],
  /******************************************************************
   * PROPS
   ******************************************************************/
  props: {
    collectionName: { type: String, default: '', required: false },
    current: { type: Number, default: 0, required: false },
    length: { type: Number, default: 1, required: false },
    field: { type: String, default: '', required: false },
    status: { type: Boolean, default: true, required: false },
  },
}
</script>

<template>
  <div>
    <a-text-field
      label="collection"
      :value="collectionName"
      required
      @input="$emit('update:collectionName', $event)"
    />
    <a-numeric
      label="current"
      :value="current"
      required
      @input="$emit('update:current', $event)"
    />
    <a-numeric
      label="length"
      :value="length"
      required
      @input="$emit('update:length', $event)"
    />
    <a-text-field
      label="field"
      :value="field"
      required
      @input="$emit('update:field', $event)"
    />
    <a-switch
      v-if="editMode !== 'REGIST'"
      label="status"
      :input-value="status"
      @change="$emit('update:status', $event)"
    />
  </div>
</template>

<style></style>
