<script>
/**
 * @author shisyamo4131
 */
import HTemplateCollectItemsEditor from '~/components/templates/collectItems/HTemplateCollectItemsEditor.vue'
export default {
  /******************************************************************
   * NAME
   ******************************************************************/
  name: 'CollectItemsEdit',
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: { HTemplateCollectItemsEditor },
  /******************************************************************
   * ASYNCDATA
   ******************************************************************/
  async asyncData({ app, route }) {
    const docId = route.params.docId
    const model = app.$CollectItem()
    await model.fetch(docId)
    return { docId, model }
  },
}
</script>

<template>
  <h-template-collect-items-editor edit-mode="UPDATE" :model="model" />
</template>

<style></style>
