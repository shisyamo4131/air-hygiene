<script>
/**
 * @create 2023-09-25
 * @author shisyamo4131
 */
export default {
  /******************************************************************
   * PROPS
   ******************************************************************/
  props: {
    dense: { type: Boolean, default: true, required: false },
    label: { type: String, default: undefined, required: false },
    outlined: { type: Boolean, default: true, required: false },
    required: { type: Boolean, default: false, required: false },
  },
  /******************************************************************
   * DATA
   ******************************************************************/
  data() {
    return {
      katakanaRule: (v) => /^([ァ-ンヴーｧ-ﾝﾞﾟ／：・]*)?$/.test(v),
    }
  },
}
</script>

<template>
  <air-text-field
    v-bind="{ ...$props, ...$attrs }"
    :katakana-rule="katakanaRule"
    v-on="$listeners"
  >
    <template v-if="label" #label>
      <span>{{ label }}</span>
      <span v-if="required" class="red--text">*</span>
    </template>
    <template
      v-for="(_, scopedSlotName) in $scopedSlots"
      #[scopedSlotName]="slotData"
    >
      <slot :name="scopedSlotName" v-bind="slotData" />
    </template>
    <template v-for="(_, slotName) in $slots" #[slotName]>
      <slot :name="slotName" />
    </template>
  </air-text-field>
</template>

<style></style>
