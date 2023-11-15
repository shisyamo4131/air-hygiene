<script>
/**
 * @author shisyamo4131
 */
import HTemplateDefault from '~/components/templates/HTemplateDefault.vue'
import HDataTableRoots from '~/components/molecules/tables/HDataTableRoots.vue'
import HBtnRegist from '~/components/molecules/btns/HBtnRegist.vue'
import HInputRoot from '~/components/molecules/inputs/HInputRoot.vue'
import HCardFormInput from '~/components/molecules/cards/HCardFormInput.vue'
export default {
  /******************************************************************
   * NAME
   ******************************************************************/
  name: 'RootsIndex',
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: {
    HTemplateDefault,
    HDataTableRoots,
    HBtnRegist,
    HInputRoot,
    HCardFormInput,
  },
  /******************************************************************
   * ASYNCDATA
   ******************************************************************/
  asyncData({ store }) {
    const items = store.state.masters.Roots
    return { items }
  },
  /******************************************************************
   * DATA
   ******************************************************************/
  data() {
    return {
      editMode: 'REGIST',
      editor: false,
      editItem: this.$Root(),
      loading: false,
    }
  },
  /******************************************************************
   * WATCH
   ******************************************************************/
  watch: {
    editor(v) {
      v || this.initialize()
    },
  },
  /******************************************************************
   * METHODS
   ******************************************************************/
  methods: {
    initialize() {
      this.editMode = 'REGIST'
      this.editItem.initialize()
      this.$refs.form.initialize()
    },
    async onClickSubmit(mode) {
      if (mode !== 'DELETE' && !this.$refs.form.validate()) return
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
  <h-template-default label="回収ルート管理">
    <template #append-toolbar>
      <v-dialog v-model="editor" max-width="360" persistent>
        <template #activator="{ attrs, on }">
          <h-btn-regist v-bind="attrs" icon v-on="on" />
        </template>
        <h-card-form-input
          ref="form"
          :edit-mode="editMode"
          :label="`回収ルート${editMode === 'REGIST' ? '登録' : '編集'}`"
          :loading="loading"
          @click:cancel="editor = false"
          @click:submit="onClickSubmit"
        >
          <template #default="props">
            <h-input-root
              v-bind.sync="editItem"
              :edit-mode="props.editMode"
              :loading="props.loading"
            />
          </template>
        </h-card-form-input>
      </v-dialog>
    </template>
    <template #default="{ height }">
      <h-data-table-roots
        :height="height"
        :items="items"
        @click:row="$router.push(`/roots/${$event.docId}`)"
      />
    </template>
  </h-template-default>
</template>

<style></style>
