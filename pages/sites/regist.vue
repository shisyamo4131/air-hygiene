<script>
/**
 * @author shisyamo4131
 */
import HPageEditor from '~/components/templates/HPageEditor.vue'
export default {
  /******************************************************************
   * NAME
   ******************************************************************/
  name: 'SitesRegist',
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: { HPageEditor },
}
</script>

<template>
  <h-page-editor
    collection="Sites"
    edit-mode="REGIST"
    @click:cancel="$router.go(-1)"
    @submitted="$router.push(`/sites/${$event.docId}`)"
  />
</template>

<style></style>
