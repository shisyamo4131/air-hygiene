<script>
/**
 * @author shisyamo4131
 */
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import AAutocompleteSite from '~/components/atoms/inputs/AAutocompleteSite.vue'
import HCardFormInput from '~/components/molecules/cards/HCardFormInput.vue'
import HInputCollectionResult from '~/components/molecules/inputs/HInputCollectionResult.vue'
import HDataTableCollectionResults from '~/components/molecules/tables/HDataTableCollectionResults.vue'
import HTemplateDefault from '~/components/templates/HTemplateDefault.vue'
export default {
  /******************************************************************
   * NAME
   ******************************************************************/
  name: 'CollectionResultsIndex',
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: {
    HTemplateDefault,
    HDataTableCollectionResults,
    AAutocompleteSite,
    HInputCollectionResult,
    HCardFormInput,
  },
  /******************************************************************
   * DATA
   ******************************************************************/
  data() {
    return {
      editor: false,
      editItem: this.$CollectionResult(),
      editMode: 'REGIST',
      items: [],
      listener: null,
      loading: false,
      site: null,
      yearMonth: this.$dayjs().format('YYYY-MM'),
    }
  },
  /******************************************************************
   * WATCH
   ******************************************************************/
  watch: {
    editor(v) {
      v || this.initialize()
    },
    site: {
      handler(v) {
        this.editItem.site = v
        this.subscribe()
      },
      immediate: true,
      deep: true,
    },
    yearMonth(v) {
      this.subscribe()
    },
  },
  /******************************************************************
   * DESTROYED
   ******************************************************************/
  destroyed() {
    this.unsubscribe()
  },
  /******************************************************************
   * METHODS
   ******************************************************************/
  methods: {
    initialize() {
      this.editItem.initialize({ site: this.site })
      this.editMode = 'REGIST'
      this.$refs.form.initialize()
    },
    validate() {
      return true
    },
    unsubscribe() {
      if (this.listener) this.listener()
      this.items.splice(0)
    },
    subscribe() {
      this.unsubscribe()
      if (!this.site) return
      const colRef = collection(this.$firestore, 'CollectionResults')
      const q = query(
        colRef,
        where('site.docId', '==', this.site.docId),
        where('yearMonth', '==', this.yearMonth)
      )
      this.listener = onSnapshot(q, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          const item = change.doc.data()
          const index = this.items.findIndex(
            ({ docId }) => docId === item.docId
          )
          if (change.type === 'added') this.items.push(item)
          if (change.type === 'modified') this.items.splice(index, 1, item)
          if (change.type === 'removed') this.items.splice(index, 1)
        })
      })
    },
    onClickEdit(item) {
      this.editItem.initialize(item)
      this.editMode = 'UPDATE'
      this.editor = true
    },
    async onClickSubmit(mode) {
      if (mode !== 'DELETE' && !this.$refs.form.validate()) return
      if (mode !== 'DELETE' && !this.validate()) return
      try {
        this.loading = true
        if (mode === 'REGIST') await this.editItem.create()
        if (mode === 'UPDATE') await this.editItem.update()
        if (mode === 'DELETE') await this.editItem.delete()
        this.editor = false
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
  <h-template-default
    label="回収実績管理"
    :header-height="$vuetify.breakpoint.smAndDown ? 56 : 64"
  >
    <template #header>
      <v-toolbar flat>
        <a-autocomplete-site
          v-model="site"
          hide-details
          placeholder="排出場所を指定してください"
          prepend-inner-icon="mdi-magnify"
          :outlined="false"
          solo-inverted
          return-object
        />
      </v-toolbar>
    </template>
    <template #default="{ height }">
      <h-data-table-collection-results
        :disable-regist="!site"
        :height="height"
        :items="items"
        show-regist-btn
        :sort-by="['date', 'resultType']"
        :sort-desc="[true, false]"
        :year-month.sync="yearMonth"
        @click:regist="editor = true"
        @click:row="onClickEdit"
      />
      <v-dialog v-model="editor" persistent max-width="840">
        <h-card-form-input
          ref="form"
          :edit-mode="editMode"
          :loading="loading"
          @click:cancel="editor = false"
          @click:submit="onClickSubmit"
        >
          <template #default="props">
            <h-input-collection-result
              v-bind.sync="editItem"
              :edit-mode="props.editMode"
              :loading="props.loading"
            />
          </template>
        </h-card-form-input>
      </v-dialog>
    </template>
  </h-template-default>
</template>

<style></style>
