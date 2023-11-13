<script>
/**
 * @author shisyamo4131
 */
import HBtnEdit from '~/components/molecules/btns/HBtnEdit.vue'
import HSimpleTableCustomer from '~/components/molecules/tables/HSimpleTableCustomer.vue'
import HTemplateTabs from '~/components/templates/HTemplateTabs.vue'
export default {
  /******************************************************************
   * NAME
   ******************************************************************/
  name: 'CustomersDetail',
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: { HTemplateTabs, HBtnEdit, HSimpleTableCustomer },
  /******************************************************************
   * ASYNCDATA
   ******************************************************************/
  async asyncData({ app, route }) {
    const docId = route.params.docId
    const item = app.$Customer()
    await item.fetch(docId)
    return { docId, item }
  },
  /******************************************************************
   * DATA
   ******************************************************************/
  data() {
    return {
      tabs: ['Dashboard', '登録情報'],
    }
  },
}
</script>

<template>
  <h-template-tabs label="取引先詳細" :tabs="tabs">
    <template #append-toolbar="{ tab }">
      <h-btn-edit v-show="tab === 1" icon />
    </template>
    <template #tab-0>
      <v-container>
        <v-card outlined>
          <v-card-title>{{ item.abbr }}</v-card-title>
        </v-card>
      </v-container>
    </template>
    <template #tab-1>
      <v-container>
        <h-simple-table-customer v-bind="item" />
      </v-container>
    </template>
  </h-template-tabs>
</template>

<style></style>
