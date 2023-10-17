<script>
/**
 * @author shisyamo4131
 */
import HTemplateCustomersDetail from '~/components/templates/customers/HTemplateCustomersDetail.vue'
export default {
  /******************************************************************
   * NAME
   ******************************************************************/
  name: 'CustomersDetail',
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: { HTemplateCustomersDetail },
  /******************************************************************
   * ASYNCDATA
   ******************************************************************/
  asyncData({ store, route }) {
    const docId = route.params.docId
    const model = store.getters['masters/Customer'](docId)
    return { model }
  },
}
</script>

<template>
  <h-template-customers-detail :model="model" />
</template>

<style></style>
