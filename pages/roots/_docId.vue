<script>
/**
 * @author shisyamo4131
 */
import HBtnBack from '~/components/molecules/btns/HBtnBack.vue'
import HBtnEdit from '~/components/molecules/btns/HBtnEdit.vue'
// import HDataTableSites from '~/components/molecules/tables/HDataTableSites.vue'
import HSimpleTableRoot from '~/components/molecules/tables/HSimpleTableRoot.vue'
import HTimelineRootOrders from '~/components/organisms/HTimelineRootOrders.vue'
import HTemplateTabs from '~/components/templates/HTemplateTabs.vue'
export default {
  /******************************************************************
   * NAME
   ******************************************************************/
  name: 'RootsDetail',
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: {
    HTemplateTabs,
    HBtnEdit,
    HSimpleTableRoot,
    HBtnBack,
    HTimelineRootOrders,
    // HDataTableSites,
  },
  /******************************************************************
   * ASYNCDATA
   ******************************************************************/
  asyncData({ route }) {
    const docId = route.params.docId
    return { docId }
  },
  /******************************************************************
   * DATA
   ******************************************************************/
  data() {
    return {
      loading: false,
      tabs: ['Dashboard', '登録情報', '回収順序', '設定'],
    }
  },
  /******************************************************************
   * COMPUTED
   ******************************************************************/
  computed: {
    item() {
      const item = this.$Root()
      item.initialize(this.$store.getters['masters/Root'](this.docId))
      return item
    },
  },
  /******************************************************************
   * METHODS
   ******************************************************************/
  methods: {
    async onClickDelete() {
      try {
        this.loading = true
        await this.item.delete()
        this.$router.replace(`/roots`)
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
  <h-template-tabs label="回収ルート詳細" :tabs="tabs">
    <template #prepend-toolbar>
      <h-btn-back icon @click="$router.push(`/roots/`)" />
    </template>
    <template #append-toolbar="{ tab }">
      <h-btn-edit
        v-show="tab === 1"
        icon
        @click="$router.push(`/roots/${docId}/edit`)"
      />
    </template>
    <template #tab-0>
      <v-container fluid>
        <v-card outlined>
          <v-card-title>{{ `【${item.code}】${item.name}` }}</v-card-title>
        </v-card>
      </v-container>
    </template>
    <template #tab-1>
      <h-simple-table-root v-bind="item" />
    </template>
    <template #tab-2>
      <h-timeline-root-orders :root-id="docId" />
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
              この回収ルートを削除する
            </v-btn>
          </template>
        </air-dialog-confirm-delete>
      </v-container>
    </template>
  </h-template-tabs>
</template>

<style></style>
