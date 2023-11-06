<script>
/**
 * ### ATextFieldUnitAbbr
 *
 * A component for abbreviation of Unit.
 *
 * @author shisyamo4131
 */
import ATextField from './ATextField.vue'
export default {
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: { ATextField },
  /******************************************************************
   * PROPS
   ******************************************************************/
  props: {
    counter: { type: Boolean, default: true, required: false },
    hint: { type: String, default: '4文字以内', required: false },
    label: { type: String, default: '略称', required: false },
    maxLength: { type: [Number, String], default: 4, required: false },
  },
}
</script>

<template>
  <a-text-field v-bind="{ ...$props, ...$attrs }" v-on="$listeners">
    <template
      v-for="(_, scopedSlotName) in $scopedSlots"
      #[scopedSlotName]="slotData"
    >
      <slot :name="scopedSlotName" v-bind="slotData" />
    </template>
    <template v-for="(_, slotName) in $slots" #[slotName]>
      <slot :name="slotName" />
    </template>
  </a-text-field>
</template>

<style></style>
