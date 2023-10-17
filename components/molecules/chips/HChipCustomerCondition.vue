<script>
/**
 * @create 2023-09-27
 * @author shisyamo4131
 */
export default {
  /******************************************************************
   * PROPS
   ******************************************************************/
  props: {
    value: {
      type: String,
      validator: (v) => ['active', 'expired'].includes(v),
      required: true,
    },
  },
  /******************************************************************
   * COMPUTED
   ******************************************************************/
  computed: {
    label() {
      return this.$CUSTOMER_CONDITION[this.value]
    },
    color() {
      return this.value === 'active' ? 'primary' : 'grey darken-2'
    },
  },
}
</script>

<template>
  <v-chip v-bind="$attrs" :color="color" v-on="$listeners">
    {{ label }}
  </v-chip>
</template>

<style></style>
