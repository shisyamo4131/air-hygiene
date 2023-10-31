<script>
/**
 * ### HNumericDepositMonth
 *
 * A component for deadline.
 *
 * @author shisyamo4131
 */
import ANumeric from './ANumeric.vue'
export default {
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: { ANumeric },
  /******************************************************************
   * PROPS
   ******************************************************************/
  props: {
    label: { type: String, default: '入金月', required: false },
    suffix: { type: String, default: 'ヶ月後', required: false },
  },
}
</script>

<template>
  <a-numeric
    v-bind="{ ...$props, ...$attrs }"
    class="right-input"
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
  </a-numeric>
</template>

<style></style>
