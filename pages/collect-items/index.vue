<script>
/**
 * @author shisyamo4131
 */
import HTemplateCollectItemsIndex from '~/components/templates/collectItems/HTemplateCollectItemsIndex.vue'
export default {
  /******************************************************************
   * NAME
   ******************************************************************/
  name: 'CollectItemsIndex',
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: { HTemplateCollectItemsIndex },
  /******************************************************************
   * ASYNCDATA
   ******************************************************************/
  asyncData({ store }) {
    const items = store.state.masters.CollectItems
    return { items }
  },
}
</script>

<template>
  <h-template-collect-items-index :items="items" />
</template>

<style></style>
