<template>
  <div>
    <a-data-table-collection-results
      :height="500"
      hide-default-footer
      show-actions
      :items="items.collectionResults"
    />
  </div>
</template>

<script>
import ADataTableCollectionResults from '~/components/atoms/tables/ADataTableCollectionResults.vue'
import TestDataCollectionResults from '~/assets/TestDataCollectionResult.json'
export default {
  components: { ADataTableCollectionResults },
  data() {
    return {
      siteId: 'UVgfx4L1kWUXYytmApvs',
      date: '2023-10-01',
      value: null,
      editor: false,
      editModel: this.$CollectionResultDetail(),
      item: '',
      headers: [
        { text: 'collectItemId', value: 'collectItemId' },
        { text: 'unitPrice', value: 'unitPrice' },
      ],
      items: {
        collectionResults: TestDataCollectionResults,
      },
    }
  },
}
</script>

<style></style>
