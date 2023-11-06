<script>
export default {
  /******************************************************************
   * PROPS
   ******************************************************************/
  props: {
    color: { type: String, default: 'primary', required: false },
    icon: { type: String, default: 'mdi-check', required: false },
    label: { type: String, default: '確定', required: false },
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
  <v-btn v-bind="$attrs" :color="color" :icon="isMobile" v-on="$listeners">
    <v-icon v-if="isMobile">{{ icon }}</v-icon>
    <span v-else
      ><v-icon left>{{ icon }}</v-icon
      >{{ label }}</span
    >
  </v-btn>
</template>

<style></style>
