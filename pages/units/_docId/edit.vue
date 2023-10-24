<script>
/**
 * @author shisyamo4131
 */
import HTemplateUnitsEditor from '~/components/templates/units/HTemplateUnitsEditor.vue'
export default {
  /******************************************************************
   * NAME
   ******************************************************************/
  name: 'UnitsEditor',
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: { HTemplateUnitsEditor },
  /******************************************************************
   * ASYNCDATA
   ******************************************************************/
  async asyncData({ app, route }) {
    const docId = route.params.docId
    const model = app.$Unit()
    await model.fetch(docId)
    return { docId, model }
  },
}
</script>

<template>
  <h-template-units-editor edit-mode="UPDATE" :model="model" />
</template>

<style></style>
