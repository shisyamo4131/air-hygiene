<template>
  <div>
    <h-text-field-collect-item-code v-model="value" required />
    {{ value }}
  </div>
</template>

<script>
import HTextFieldCollectItemCode from '~/components/atoms/inputs/HTextFieldCollectItemCode.vue'
export default {
  components: { HTextFieldCollectItemCode },
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
          collectItemId: '4aODIZusF3GDXY6ijAFK',
          unitId: '2ex58kaPmws7hZ9MW1BK',
          id: '4aODIZusF3GDXY6ijAFK-2ex58kaPmws7hZ9MW1BK',
          amount: 30,
          unitPrice: 300,
        },
        {
          collectItemId: '54GhKFHexnbdWN3TtSyF',
          unitId: '3HkRjuhT1e1yCKdE2ZTq',
          id: '54GhKFHexnbdWN3TtSyF-3HkRjuhT1e1yCKdE2ZTq',
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
