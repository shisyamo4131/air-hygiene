<script>
/**
 * @author shisyamo4131
 */
import HTemplateCollectItemsEditor from '~/components/templates/collectItems/HTemplateCollectItemsEditor.vue'
export default {
  /******************************************************************
   * NAME
   ******************************************************************/
  name: 'CollectItemsRegist',
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: { HTemplateCollectItemsEditor },
  /******************************************************************
   * ASYNCDATA
   ******************************************************************/
  asyncData({ app, route }) {
    const docId = route.params.docId
    const model = app.$CollectItem()
    return { docId, model }
  },
}
</script>

<template>
  <h-template-collect-items-editor edit-mode="REGIST" />
</template>

<style></style>
