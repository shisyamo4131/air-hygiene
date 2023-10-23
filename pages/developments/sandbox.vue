<template>
  <air-template-default>
    <v-container>
      <h-data-table-collection-results :site-id="siteId" />
    </v-container>
  </air-template-default>
</template>

<script>
import HDataTableCollectionResults from '~/components/molecules/tables/HDataTableCollectionResults.vue'
export default {
  components: {
    HDataTableCollectionResults,
  },
  data() {
    return {
      siteId: '0LmWoOEHUHVc9HqVzDCc',
      yearMonth: '2023-12',
      value: '',
    }
  },
  methods: {},
}
</script>

<style></style>
