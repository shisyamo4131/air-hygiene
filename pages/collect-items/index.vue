<script>
/**
 * @author shisyamo4131
 */
import HBtnRegist from '~/components/molecules/btns/HBtnRegist.vue'
import HCardFormInput from '~/components/molecules/cards/HCardFormInput.vue'
import HInputCollectItem from '~/components/molecules/inputs/HInputCollectItem.vue'
import HDataTableCollectItems from '~/components/molecules/tables/HDataTableCollectItems.vue'
import HTemplateDefault from '~/components/templates/HTemplateDefault.vue'
export default {
  /******************************************************************
   * NAME
   ******************************************************************/
  name: 'CollectItemsIndex',
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: {
    HTemplateDefault,
    HDataTableCollectItems,
    HBtnRegist,
    HCardFormInput,
    HInputCollectItem,
  },
  /******************************************************************
   * ASYNCDATA
   ******************************************************************/
  asyncData({ store }) {
    const items = store.state.masters.CollectItems
    return { items }
  },
  /******************************************************************
   * DATA
   ******************************************************************/
  data() {
    return {
      editMode: 'REGIST',
      editor: false,
      editItem: this.$CollectItem(),
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
    onClickRow(item) {
      this.editMode = 'UPDATE'
      this.editItem.initialize(item)
      this.editor = true
    },
  },
}
</script>

<template>
  <h-template-default label="回収品目管理">
    <template #append-toolbar>
      <v-dialog v-model="editor" max-width="480" persistent>
        <template #activator="{ attrs, on }">
          <h-btn-regist v-bind="attrs" icon v-on="on" />
        </template>
        <h-card-form-input
          ref="form"
          :disable-delete="!editItem.deletable"
          :edit-mode="editMode"
          :label="`回収品目${editMode === 'REGIST' ? '登録' : '編集'}`"
          :loading="loading"
          @click:cancel="editor = false"
          @click:submit="onClickSubmit"
        >
          <template #default="props">
            <h-input-collect-item
              v-bind.sync="editItem"
              :edit-mode="props.editMode"
              :loading="props.loading"
            />
          </template>
        </h-card-form-input>
      </v-dialog>
    </template>
    <template #default="{ height }">
      <h-data-table-collect-items
        :height="height"
        :items="items"
        @click:row="onClickRow($event)"
      />
    </template>
  </h-template-default>
</template>

<style></style>
