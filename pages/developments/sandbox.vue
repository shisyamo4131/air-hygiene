<template>
  <div>
    <h-data-table-site-unit-price-details :items="items" />
  </div>
</template>

<script>
import HDataTableSiteUnitPriceDetails from '~/components/molecules/tables/HDataTableSiteUnitPriceDetails.vue'
export default {
  components: { HDataTableSiteUnitPriceDetails },
  data() {
    return {
      siteId: '0hDaxOWY8tcp1hRQlcGN',
      date: '2023-10-01',
      value: [],
      editModel: this.$CollectionResultDetail(),
      item: '',
      items: [
        {
          collectItemId: '4aODIZusF3GDXY6ijAFK',
          unitId: '2ex58kaPmws7hZ9MW1BK',
          id: '4aODIZusF3GDXY6ijAFK-2ex58kaPmws7hZ9MW1BK',
          unitPrice: 300,
        },
        {
          collectItemId: '54GhKFHexnbdWN3TtSyF',
          unitId: '3HkRjuhT1e1yCKdE2ZTq',
          id: '54GhKFHexnbdWN3TtSyF-3HkRjuhT1e1yCKdE2ZTq',
          unitPrice: 30,
        },
      ],
    }
  },
}
</script>

<style></style>
