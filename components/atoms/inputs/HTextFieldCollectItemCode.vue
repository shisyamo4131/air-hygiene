<script>
/**
 * ### HTextFieldCollectItemCode
 *
 * A component for code of CollectItem.
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
    hint: { type: String, default: '4桁で入力', required: false },
    label: { type: String, default: 'CODE', required: false },
    maxLength: { type: [Number, String], default: 4, required: false },
    rules: { type: Array, default: () => [], required: false },
  },
  /******************************************************************
   * DATA
   ******************************************************************/
  data() {
    return {
      lengthRule: (v) => !v || v.length === 4 || '4桁で入力してください。',
    }
  },
  /******************************************************************
   * COMPUTED
   ******************************************************************/
  computed: {
    internalRules() {
      const result = this.rules.map((item) => item)
      result.push(this.lengthRule)
      return result
    },
  },
}
</script>

<template>
  <a-text-field
    v-bind="{ ...$props, ...$attrs }"
    :rules="internalRules"
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
