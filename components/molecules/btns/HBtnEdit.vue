<script>
/**
 * ### HBtnEdit
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
    <v-icon :left="!icon">mdi-pencil</v-icon>
    <span v-if="!icon">編集</span>
  </v-btn>
</template>

<style></style>
