<script>
/**
 * @author shisyamo4131
 */
import HPageEditor from '~/components/templates/HPageEditor.vue'
export default {
  /******************************************************************
   * NAME
   ******************************************************************/
  name: 'IndustrialPermissionsRegist',
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: { HPageEditor },
}
</script>

<template>
  <h-page-editor
    collection="IndustrialPermissions"
    edit-mode="REGIST"
    @click:cancel="$router.go(-1)"
    @submitted="$router.push(`/industrial-permissions/${$event.docId}`)"
  />
</template>

<style></style>
