<template>
  <air-template-default>
    <v-container>
      <test-component :items="items" show-actions> </test-component>
    </v-container>
  </air-template-default>
</template>

<script>
import TestComponent from '~/components/molecules/tables/HDataTableItemUnitPrices.vue'
export default {
  components: { TestComponent },
  data() {
    return {
      items: [],
    }
  },
}
</script>

<style></style>
