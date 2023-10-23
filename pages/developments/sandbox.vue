<template>
  <air-template-default>
    <v-container>
      <h-data-table-site-collection-results :site-id="siteId" />
    </v-container>
  </air-template-default>
</template>

<script>
import HDataTableSiteCollectionResults from '~/components/molecules/tables/HDataTableSiteCollectionResults.vue'
export default {
  components: {
    HDataTableSiteCollectionResults,
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
