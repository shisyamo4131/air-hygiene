<script>
/**
 * ### HRadioGroupCustomerCondition
 *
 * @author shisyamo4131
 */
import ARadioGroup from './ARadioGroup.vue'
export default {
  components: { ARadioGroup },
  /******************************************************************
   * MODEL
   ******************************************************************/
  model: { prop: 'value', event: 'change' },
  /******************************************************************
   * DATA
   ******************************************************************/
  data() {
    return {
      items: this.$CUSTOMER_CONDITION_ARRAY,
    }
  },
}
</script>

<template>
  <a-radio-group v-bind="$attrs" :items="items" v-on="$listeners" />
</template>

<style></style>
