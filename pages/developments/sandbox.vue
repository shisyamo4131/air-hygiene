<template>
  <div>
    <m-card-site-unit-price :site-id="siteId" :date="date" :details="[]" />
  </div>
</template>

<script>
import TestDataCollectionResults from '~/assets/TestDataCollectionResult.json'
import MCardSiteUnitPrice from '~/components/molecules/cards/MCardSiteUnitPrice.vue'
export default {
  components: { MCardSiteUnitPrice },
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
