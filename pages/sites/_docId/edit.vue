<script>
/**
 * @author shisyamo4131
 */
import HTemplateSitesEditor from '~/components/templates/sites/HTemplateSitesEditor.vue'
export default {
  /******************************************************************
   * NAME
   ******************************************************************/
  name: 'SitesEdit',
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: { HTemplateSitesEditor },
  /******************************************************************
   * ASYNCDATA
   ******************************************************************/
  async asyncData({ app, route }) {
    const docId = route.params.docId
    const model = app.$Site()
    await model.fetch(docId)
    return { docId, model }
  },
}
</script>

<template>
  <h-template-sites-editor edit-mode="UPDATE" :model="model" />
</template>

<style></style>
