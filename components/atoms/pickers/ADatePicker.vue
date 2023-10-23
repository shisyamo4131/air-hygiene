<script>
export default {
  /******************************************************************
   * PROPS
   ******************************************************************/
  props: {
    color: { type: String, default: 'primary', required: false },
    locale: { type: String, default: 'ja-jp', required: false },
  },
}
</script>

<template>
  <v-date-picker v-bind="{ ...$props, ...$attrs }" v-on="$listeners">
    <template
      v-for="(_, scopedSlotName) in $scopedSlots"
      #[scopedSlotName]="slotData"
    >
      <slot :name="scopedSlotName" v-bind="slotData" />
    </template>
    <template v-for="(_, slotName) in $slots" #[slotName]>
      <slot :name="slotName" />
    </template>
  </v-date-picker>
</template>

<style></style>
