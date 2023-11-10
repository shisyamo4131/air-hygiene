<script>
/**
 * @author shisyamo4131
 */
import HPageEditor from '~/components/templates/HPageEditor.vue'
export default {
  /******************************************************************
   * NAME
   ******************************************************************/
  name: 'MunicipalPermissionsEdit',
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
        this.$router.replace(`/municipal-permissions`)
      } else {
        this.$router.replace(`/municipal-permissions/${docId}`)
      }
    },
  },
}
</script>

<template>
  <h-page-editor
    collection="MunicipalPermissions"
    :doc-id="docId"
    edit-mode="UPDATE"
    @click:cancel="$router.go(-1)"
    @submitted="onSubmitted"
  />
</template>

<style></style>
