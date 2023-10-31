<script>
/**
 * ### HSelectDeadline
 *
 * A component for deadline.
 *
 * @author shisyamo4131
 */
import ASelect from './ASelect.vue'
export default {
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: { ASelect },
  /******************************************************************
   * PROPS
   ******************************************************************/
  props: {
    label: { type: String, default: '締日', required: false },
  },
  data() {
    return {
      items: this.$DEADLINE_ARRAY,
    }
  },
}
</script>

<template>
  <a-select v-bind="{ ...$props, ...$attrs }" :items="items" v-on="$listeners">
    <template
      v-for="(_, scopedSlotName) in $scopedSlots"
      #[scopedSlotName]="slotData"
    >
      <slot :name="scopedSlotName" v-bind="slotData" />
    </template>
    <template v-for="(_, slotName) in $slots" #[slotName]>
      <slot :name="slotName" />
    </template>
  </a-select>
</template>

<style></style>
