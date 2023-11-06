<script>
export default {
  /******************************************************************
   * PROPS
   ******************************************************************/
  props: {
    color: { type: String, default: 'grey darken-1', required: false },
    icon: { type: String, default: 'mdi-cancel', required: false },
    label: { type: String, default: '取消', required: false },
  },
  /******************************************************************
   * COMPUTED
   ******************************************************************/
  computed: {
    isMobile() {
      return this.$vuetify.breakpoint.smAndDown
    },
  },
}
</script>

<template>
  <v-btn v-bind="$attrs" text :icon="isMobile" v-on="$listeners">
    <v-icon v-if="isMobile">{{ icon }}</v-icon>
    <span v-else
      ><v-icon left>{{ icon }}</v-icon
      >{{ label }}</span
    >
  </v-btn>
</template>

<style></style>
