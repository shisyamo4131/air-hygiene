<script>
/**
 * @author shisyamo4131
 */
import HBtnBack from '~/components/molecules/btns/HBtnBack.vue'
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
  components: { HTemplateTabs, HBtnEdit, HSimpleTableCustomer, HBtnBack },
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
      loading: false,
      tabs: ['Dashboard', '登録情報', '設定'],
    }
  },
  methods: {
    async onClickDelete() {
      try {
        this.loading = true
        await this.item.delete()
        this.$router.replace(`/customers`)
      } catch (err) {
        // eslint-disable-next-line
        console.error(err)
        alert(err.message)
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<template>
  <h-template-tabs label="取引先詳細" :tabs="tabs">
    <template #prepend-toolbar>
      <h-btn-back icon @click="$router.push(`/customers/`)" />
    </template>
    <template #append-toolbar="{ tab }">
      <h-btn-edit
        v-show="tab === 1"
        icon
        @click="$router.push(`/customers/${docId}/edit`)"
      />
    </template>
    <template #tab-0>
      <v-card outlined>
        <v-card-title>{{ item.abbr }}</v-card-title>
      </v-card>
    </template>
    <template #tab-1>
      <h-simple-table-customer v-bind="item" />
    </template>
    <template #tab-2>
      <air-dialog-confirm-delete @click:delete="onClickDelete">
        <template #activator="{ attrs, on }">
          <v-btn
            block
            color="error"
            dense
            :disabled="loading"
            :loading="loading"
            v-bind="attrs"
            v-on="on"
          >
            この取引先を削除する
          </v-btn>
        </template>
      </air-dialog-confirm-delete>
    </template>
  </h-template-tabs>
</template>

<style></style>
