<template>
  <div>
    <h-input-site-unit-price-details
      v-model="items"
      model="SiteUnitPriceDetail"
    />
    {{ items }}
  </div>
</template>

<script>
import HInputSiteUnitPriceDetails from '~/components/molecules/inputs/HInputSiteUnitPriceDetails.vue'
export default {
  components: { HInputSiteUnitPriceDetails },
  data() {
    return {
      siteId: '0hDaxOWY8tcp1hRQlcGN',
      date: '2023-10-01',
      value: null,
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
  methods: {
    test() {
      alert('OK')
    },
  },
}
</script>

<style></style>
