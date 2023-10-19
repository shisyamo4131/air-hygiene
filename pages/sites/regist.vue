<script>
/**
 * @author shisyamo4131
 */
import HTemplateSitesEditor from '~/components/templates/sites/HTemplateSitesEditor.vue'
export default {
  /******************************************************************
   * NAME
   ******************************************************************/
  name: 'SitesRegist',
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: { HTemplateSitesEditor },
  /******************************************************************
   * ASYNCDATA
   ******************************************************************/
  asyncData({ app, route }) {
    const docId = route.params.docId
    const model = app.$Site()
    return { docId, model }
  },
}
</script>

<template>
  <h-template-sites-editor edit-mode="REGIST" :model="model" />
</template>

<style></style>
