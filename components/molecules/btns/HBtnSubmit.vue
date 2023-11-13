<script>
/**
 * ### HBtnSubmit
 *
 * @author shisyamo4131
 */
export default {
  /******************************************************************
   * PROPS
   ******************************************************************/
  props: {
    color: { type: String, default: 'primary', required: false },
  },
}
</script>

<template>
  <v-btn v-bind="$attrs" :color="color" small v-on="$listeners">
    <v-icon left>mdi-check</v-icon>
    <span>SUBMIT</span>
  </v-btn>
</template>

<style></style>
