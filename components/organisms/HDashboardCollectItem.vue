<template>
  <v-card outlined>
    <v-card-title>{{ name }}</v-card-title>
    <v-card-text>This is CollectItem's dashboard.</v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    name: { type: String, default: '', required: false },
  },
}
</script>

<style></style>
