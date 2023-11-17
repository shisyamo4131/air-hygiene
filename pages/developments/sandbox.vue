<template>
  <div>
    <h-input-root-order
      v-bind.sync="editItem"
      edit-mode="REGIST"
      height="720"
    />
  </div>
</template>

<script>
import TestData from '~/assets/TestDataSiteUnitPrices.json'
import HInputRootOrder from '~/components/molecules/inputs/HInputRootOrder.vue'
export default {
  components: { HInputRootOrder },
  data() {
    return {
      page: 1,
      items: TestData,
      value: [],
      editItem: this.$RootOrder(),
      length: 100,
    }
  },
  methods: {},
}
</script>

<style></style>
