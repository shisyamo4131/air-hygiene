<script>
/**
 * @author shisyamo4131
 */
import HTemplateSitesIndex from '~/components/templates/sites/HTemplateSitesIndex.vue'
export default {
  /******************************************************************
   * NAME
   ******************************************************************/
  name: 'SitesIndex',
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: { HTemplateSitesIndex },
  /******************************************************************
   * ASYNCDATA
   ******************************************************************/
  asyncData({ store }) {
    const items = store.state.masters.Sites
    return { items }
  },
}
</script>

<template>
  <div>
    <h-template-sites-index :items="items" />
  </div>
</template>

<style></style>
