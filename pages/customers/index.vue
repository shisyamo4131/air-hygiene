<script>
/**
 * @author shisyamo4131
 */
import HTemplateCustomersIndex from '~/components/templates/customers/HTemplateCustomersIndex.vue'
export default {
  /******************************************************************
   * NAME
   ******************************************************************/
  name: 'CustomersIndex',
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: { HTemplateCustomersIndex },
  /******************************************************************
   * ASYNCDATA
   ******************************************************************/
  asyncData({ store }) {
    const items = store.state.masters.Customers
    return { items }
  },
}
</script>

<template>
  <div>
    <h-template-customers-index :items="items" />
  </div>
</template>

<style></style>
