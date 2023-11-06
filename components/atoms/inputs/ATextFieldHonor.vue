<script>
/**
 * ### ATextFieldHonor
 *
 * A component for honor.
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
    hint: {
      type: String,
      default: '請求書の宛名に印字されます。',
      required: false,
    },
    label: { type: String, default: '敬称', required: false },
    persistentHing: { type: Boolean, default: true, required: false },
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
