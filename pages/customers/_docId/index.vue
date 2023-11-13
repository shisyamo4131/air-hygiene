<script>
/**
 * @author shisyamo4131
 */
import { collection, getDocs, query, where } from 'firebase/firestore'
import HBtnBack from '~/components/molecules/btns/HBtnBack.vue'
import HBtnEdit from '~/components/molecules/btns/HBtnEdit.vue'
import HDataTableSites from '~/components/molecules/tables/HDataTableSites.vue'
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
  components: {
    HTemplateTabs,
    HBtnEdit,
    HSimpleTableCustomer,
    HBtnBack,
    HDataTableSites,
  },
  /******************************************************************
   * ASYNCDATA
   ******************************************************************/
  async asyncData({ app, route }) {
    const docId = route.params.docId
    const item = app.$Customer()
    await item.fetch(docId)
    const getSites = async () => {
      const colRef = collection(app.$firestore, 'Sites')
      const q = query(colRef, where('customer.docId', '==', docId))
      const snapshot = await getDocs(q)
      return snapshot.docs.map((doc) => doc.data())
    }
    const sites = await getSites()
    return { docId, item, sites }
  },
  /******************************************************************
   * DATA
   ******************************************************************/
  data() {
    return {
      loading: false,
      tabs: ['Dashboard', '登録情報', '排出場所', '設定'],
    }
  },
  /******************************************************************
   * METHODS
   ******************************************************************/
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
      <v-container fluid>
        <v-card outlined>
          <v-card-title>{{ item.abbr }}</v-card-title>
        </v-card>
      </v-container>
    </template>
    <template #tab-1>
      <h-simple-table-customer v-bind="item" />
    </template>
    <template #tab-2="{ height }">
      <h-data-table-sites :height="height" :items="sites" />
    </template>
    <template #tab-3>
      <v-container fluid>
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
      </v-container>
    </template>
  </h-template-tabs>
</template>

<style></style>
