<script>
/**
 * @author shisyamo4131
 */
import HBtnBack from '~/components/molecules/btns/HBtnBack.vue'
import HBtnEdit from '~/components/molecules/btns/HBtnEdit.vue'
import HSimpleTableSite from '~/components/molecules/tables/HSimpleTableSite.vue'
import HTimelineSiteUnitPrices from '~/components/organisms/HTimelineSiteUnitPrices.vue'
import HTemplateTabs from '~/components/templates/HTemplateTabs.vue'
export default {
  /******************************************************************
   * NAME
   ******************************************************************/
  name: 'SitesDetail',
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: {
    HTemplateTabs,
    HBtnEdit,
    HSimpleTableSite,
    HBtnBack,
    HTimelineSiteUnitPrices,
  },
  /******************************************************************
   * ASYNCDATA
   ******************************************************************/
  async asyncData({ app, route }) {
    const docId = route.params.docId
    const item = app.$Site()
    await item.fetch(docId)
    return { docId, item }
  },
  /******************************************************************
   * DATA
   ******************************************************************/
  data() {
    return {
      loading: false,
      tabs: ['Dashboard', '登録情報', '請求単価', '設定'],
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
        this.$router.replace(`/sites`)
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
  <h-template-tabs label="排出場所詳細" :tabs="tabs">
    <template #prepend-toolbar>
      <h-btn-back icon @click="$router.push(`/sites/`)" />
    </template>
    <template #append-toolbar="{ tab }">
      <h-btn-edit
        v-show="tab === 1"
        icon
        @click="$router.push(`/sites/${docId}/edit`)"
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
      <h-simple-table-site v-bind="item" />
    </template>
    <template #tab-2>
      <v-container fluid>
        <h-timeline-site-unit-prices :site-id="docId" />
      </v-container>
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
              この排出場所を削除する
            </v-btn>
          </template>
        </air-dialog-confirm-delete>
      </v-container>
    </template>
  </h-template-tabs>
</template>

<style></style>
