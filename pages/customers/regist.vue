<script>
/**
 * @author shisyamo4131
 */
import HPageEditor from '~/components/templates/HPageEditor.vue'
export default {
  /******************************************************************
   * NAME
   ******************************************************************/
  name: 'CustomersRegist',
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: { HPageEditor },
}
</script>

<template>
  <h-page-editor
    collection="Customers"
    edit-mode="REGIST"
    @click:cancel="$router.go(-1)"
    @submitted="$router.push(`/customers/${$event.docId}`)"
  />
</template>

<style></style>
