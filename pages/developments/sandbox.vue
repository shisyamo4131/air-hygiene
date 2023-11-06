<template>
  <div>
    <h-input-collection-result-details v-model="items" />
  </div>
</template>

<script>
import HInputCollectionResultDetails from '~/components/molecules/inputs/HInputCollectionResultDetails.vue'
export default {
  components: { HInputCollectionResultDetails },
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
      items: [
        {
          collectItemId: '1011',
          unitId: '11',
          id: '1011-11',
          amount: 30,
          unitPrice: 300,
        },
        {
          collectItemId: '1015',
          unitId: '11',
          id: '1015-11',
          amount: 20,
          unitPrice: 30,
        },
      ],
    }
  },
}
</script>

<style></style>
