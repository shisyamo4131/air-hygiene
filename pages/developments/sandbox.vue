<template>
  <div>
    <a-autocomplete-customer v-model="value" />
  </div>
</template>

<script>
import TestData from '~/assets/defaultCustomers.json'
import AAutocompleteCustomer from '~/components/atoms/inputs/AAutocompleteCustomer.vue'
export default {
  components: { AAutocompleteCustomer },
  data() {
    return {
      search: null,
      items: TestData,
      value: null,
    }
  },
  methods: {
    test() {
      console.log('OK')
    },
  },
}
</script>

<style></style>
