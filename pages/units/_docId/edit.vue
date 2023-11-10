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
  asyncData({ route }) {
    const docId = route.params.docId
    return { docId }
  },
  /******************************************************************
   * METHODS
   ******************************************************************/
  methods: {
    onSubmitted({ editMode, docId }) {
      if (editMode === 'DELETE') {
        this.$router.replace(`/units`)
      } else {
        this.$router.replace(`/units/${docId}`)
      }
    },
  },
}
</script>

<template>
  <h-page-editor
    collection="Units"
    :doc-id="docId"
    edit-mode="UPDATE"
    @click:cancel="$router.go(-1)"
    @submitted="onSubmitted"
  />
</template>

<style></style>
