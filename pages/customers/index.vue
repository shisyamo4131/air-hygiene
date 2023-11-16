<script>
/**
 * @author shisyamo4131
 */
import HTemplateDefault from '~/components/templates/HTemplateDefault.vue'
import HDataTableCustomers from '~/components/molecules/tables/HDataTableCustomers.vue'
import HBtnRegist from '~/components/molecules/btns/HBtnRegist.vue'
export default {
  /******************************************************************
   * NAME
   ******************************************************************/
  name: 'CustomersIndex',
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: { HTemplateDefault, HDataTableCustomers, HBtnRegist },
}
</script>

<template>
  <h-template-default label="取引先管理">
    <template #append-toolbar>
      <h-btn-regist icon @click="$router.push(`/customers/regist`)" />
    </template>
    <template #default="{ height }">
      <h-data-table-customers
        :height="height"
        :items="$store.state.masters.Customers"
        @click:row="$router.push(`/customers/${$event.docId}`)"
      />
    </template>
  </h-template-default>
</template>

<style></style>
