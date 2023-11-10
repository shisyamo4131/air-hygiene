<template>
  <v-card outlined>
    <v-card-title>{{ name1 }}</v-card-title>
    <v-card-text>This is Customer's dashboard.</v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    name1: { type: String, default: '', required: false },
  },
}
</script>

<style></style>
