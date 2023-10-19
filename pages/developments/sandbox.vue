<template>
  <air-template-default>
    <v-container>
      <h-autocomplete-customer v-model="value" />
    </v-container>
  </air-template-default>
</template>

<script>
import HAutocompleteCustomer from '~/components/molecules/inputs/HAutocompleteCustomer.vue'
export default {
  components: { HAutocompleteCustomer },
  data() {
    return {
      value: '',
    }
  },
}
</script>

<style></style>
