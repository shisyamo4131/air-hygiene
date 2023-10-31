<template>
  <div>
    <a-data-table
      :items="items"
      :headers="headers"
      label="data table"
      show-toolbar
      @click:regist="test"
    />
  </div>
</template>

<script>
import ADataTable from '~/components/atoms/tables/ADataTable.vue'
export default {
  components: { ADataTable },
  data() {
    return {
      siteId: '0hDaxOWY8tcp1hRQlcGN',
      date: '2023-10-01',
      value: [],
      editModel: this.$CollectionResultDetail(),
      item: '',
      headers: [
        { text: 'collectItemId', value: 'collectItemId' },
        { text: 'unitPrice', value: 'unitPrice' },
      ],
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
  methods: {
    test() {
      alert('OK')
    },
  },
}
</script>

<style></style>
