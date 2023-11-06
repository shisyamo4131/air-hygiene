<script>
/**
 * ### AAutocompleteWasteDiv
 *
 * A component for wasteDiv.
 *
 * @author shisyamo4131
 */
import AAutocomplete from './AAutocomplete.vue'
export default {
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: { AAutocomplete },
  /******************************************************************
   * PROPS
   ******************************************************************/
  props: {
    autoSelectFirst: { type: Boolean, default: true, required: false },
    label: { type: String, default: '廃棄物区分', required: false },
  },
  data() {
    return {
      items: this.$WASTE_DIV_ARRAY,
    }
  },
}
</script>

<template>
  <a-autocomplete
    v-bind="{ ...$props, ...$attrs }"
    :items="items"
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
  </a-autocomplete>
</template>

<style></style>
