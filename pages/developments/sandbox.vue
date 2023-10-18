<template>
  <air-template-default>
    <v-container>
      <h-data-table-item-unit-prices :items="items" />
    </v-container>
  </air-template-default>
</template>

<script>
import HDataTableItemUnitPrices from '~/components/molecules/tables/HDataTableItemUnitPrices.vue'
export default {
  components: { HDataTableItemUnitPrices },
  data() {
    return {
      items: [],
    }
  },
}
</script>

<style></style>
