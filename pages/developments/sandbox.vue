<template>
  <div>
    <h-data-table-sites :items="items" :height="640" show-regist-btn />
  </div>
</template>

<script>
import TestData from '~/assets/defaultSites.json'
import HDataTableSites from '~/components/molecules/tables/HDataTableSites.vue'
export default {
  components: { HDataTableSites },
  data() {
    return {
      items: TestData,
    }
  },
  methods: {},
}
</script>

<style></style>
