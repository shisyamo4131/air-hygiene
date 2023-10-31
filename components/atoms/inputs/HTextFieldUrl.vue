<script>
/**
 * ### HTextFieldUrl
 *
 * A component for url.
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
    label: { type: String, default: 'URL', required: false },
  },
}
</script>

<template>
  <a-text-field
    v-bind="{ ...$props, ...$attrs }"
    input-type="url"
    v-on="$listeners"
  >
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
