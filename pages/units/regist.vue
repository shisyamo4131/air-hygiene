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
  asyncData({ app, route }) {
    const docId = route.params.docId
    const model = app.$Unit()
    return { docId, model }
  },
}
</script>

<template>
  <h-template-units-editor edit-mode="REGIST" :model="model" />
</template>

<style></style>
