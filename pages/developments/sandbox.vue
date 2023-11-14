<template>
  <div>
    <h-input-site-unit-price v-bind.sync="item" edit-mode="REGIST" />
  </div>
</template>

<script>
import TestData from '~/assets/TestDataSiteUnitPrices.json'
import HInputSiteUnitPrice from '~/components/molecules/inputs/HInputSiteUnitPrice.vue'
export default {
  components: { HInputSiteUnitPrice },
  data() {
    return {
      items: TestData,
      item: TestData[0],
    }
  },
  methods: {},
}
</script>

<style></style>
