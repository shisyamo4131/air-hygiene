<template>
  <div style="height: 48px">
    <v-pagination v-model="page" :length="30" />
  </div>
</template>

<script>
import TestData from '~/assets/TestDataSiteUnitPrices.json'
export default {
  data() {
    return {
      page: 1,
      items: TestData,
      value: [],
    }
  },
  methods: {},
}
</script>

<style></style>
