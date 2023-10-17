<script>
/**
 * @create 2023-10-13
 * @author shisyamo4131
 */
import HTemplateItemsIndex from '~/components/templates/items/HTemplateItemsIndex.vue'
export default {
  /******************************************************************
   * NAME
   ******************************************************************/
  name: 'ItemsIndex',
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: { HTemplateItemsIndex },
  /******************************************************************
   * ASYNCDATA
   ******************************************************************/
  asyncData({ store }) {
    const items = store.state.masters.Items
    return { items }
  },
}
</script>

<template>
  <h-template-items-index :items="items" />
</template>

<style></style>
