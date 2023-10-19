<script>
/**
 * @author shisyamo4131
 */
import HTemplateCustomersEditor from '~/components/templates/customers/HTemplateCustomersEditor.vue'
export default {
  /******************************************************************
   * NAME
   ******************************************************************/
  name: 'CustomersRegist',
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: { HTemplateCustomersEditor },
  /******************************************************************
   * ASYNCDATA
   ******************************************************************/
  asyncData({ app, route }) {
    const docId = route.params.docId
    const model = app.$Customer()
    return { docId, model }
  },
}
</script>

<template>
  <h-template-customers-editor edit-mode="REGIST" :model="model" />
</template>

<style></style>
