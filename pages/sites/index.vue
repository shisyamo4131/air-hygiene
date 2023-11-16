<script>
/**
 * @author shisyamo4131
 */
import HTemplateDefault from '~/components/templates/HTemplateDefault.vue'
import HDataTableSites from '~/components/molecules/tables/HDataTableSites.vue'
import HBtnRegist from '~/components/molecules/btns/HBtnRegist.vue'
export default {
  /******************************************************************
   * NAME
   ******************************************************************/
  name: 'SitesIndex',
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: { HTemplateDefault, HDataTableSites, HBtnRegist },
}
</script>

<template>
  <h-template-default label="排出場所管理">
    <template #append-toolbar>
      <h-btn-regist icon @click="$router.push(`/sites/regist`)" />
    </template>
    <template #default="{ height }">
      <h-data-table-sites
        :height="height"
        :items="$store.state.masters.Sites"
        @click:row="$router.push(`/sites/${$event.docId}`)"
      />
    </template>
  </h-template-default>
</template>

<style></style>
