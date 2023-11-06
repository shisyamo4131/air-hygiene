<script>
/**
 * ### ATextFieldCollectItemNameKana
 *
 * A component for nameKana of CollectItem.
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
    label: { type: String, default: '回収品目名カナ', required: false },
  },
}
</script>

<template>
  <a-text-field
    v-bind="{ ...$props, ...$attrs }"
    input-type="katakana"
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
