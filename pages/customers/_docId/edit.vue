<script>
/**
 * @author shisyamo4131
 */
import HPageEditor from '~/components/templates/HPageEditor.vue'
export default {
  /******************************************************************
   * NAME
   ******************************************************************/
  name: 'CustomersEdit',
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: { HPageEditor },
  /******************************************************************
   * ASYNCDATA
   ******************************************************************/
  async asyncData({ app, route }) {
    const docId = route.params.docId
    const model = app.$Customer()
    await model.fetch(docId)
    return { docId, model }
  },
  /******************************************************************
   * METHODS
   ******************************************************************/
  methods: {
    onSubmitted({ editMode, docId }) {
      if (editMode === 'DELETE') {
        this.$router.replace(`/customers`)
      } else {
        this.$router.replace(`/customers/${docId}`)
      }
    },
  },
}
</script>

<template>
  <h-page-editor
    collection="Customers"
    :default-item="model"
    :doc-id="docId"
    edit-mode="UPDATE"
    @click:cancel="$router.go(-1)"
    @submitted="onSubmitted"
  />
</template>

<style></style>
