<script>
/**
 * @author shisyamo4131
 */
import HPageEditor from '~/components/templates/HPageEditor.vue'
export default {
  /******************************************************************
   * NAME
   ******************************************************************/
  name: 'MunicipalPermissionsRegist',
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: { HPageEditor },
}
</script>

<template>
  <h-page-editor
    collection="MunicipalPermissions"
    edit-mode="REGIST"
    @click:cancel="$router.go(-1)"
    @submitted="$router.push(`/municipal-permissions/${$event.docId}`)"
  />
</template>

<style></style>
