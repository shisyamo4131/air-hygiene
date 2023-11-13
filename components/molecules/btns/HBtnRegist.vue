<script>
/**
 * ### HBtnRegist
 *
 * @author shisyamo4131
 */
export default {
  /******************************************************************
   * PROPS
   ******************************************************************/
  props: {
    icon: { type: Boolean, default: false, required: false },
  },
}
</script>

<template>
  <v-btn v-bind="$attrs" :icon="icon" v-on="$listeners">
    <v-icon :left="!icon">mdi-plus</v-icon>
    <span v-if="!icon">追加</span>
  </v-btn>
</template>

<style></style>
