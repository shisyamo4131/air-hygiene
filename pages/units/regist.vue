<script>
/**
 * @author shisyamo4131
 */
import HPageEditor from '~/components/templates/HPageEditor.vue'
export default {
  /******************************************************************
   * NAME
   ******************************************************************/
  name: 'UnitsEditor',
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: { HPageEditor },
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
  <h-page-editor
    collection="Units"
    edit-mode="REGIST"
    @click:cancel="$router.go(-1)"
    @submitted="$router.push(`/units/${$event.docId}`)"
  />
</template>

<style></style>
