<script>
/**
 * @author shisyamo4131
 */
import AAutocompleteSite from '~/components/atoms/inputs/AAutocompleteSite.vue'
import HInputCollectionResult from '~/components/molecules/inputs/HInputCollectionResult.vue'
import ADataTableCollectionResults from '~/components/atoms/tables/ADataTableCollectionResults.vue'
export default {
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: {
    HInputCollectionResult,
    ADataTableCollectionResults,
    AAutocompleteSite,
  },
  /******************************************************************
   * DATA
   ******************************************************************/
  data() {
    return {
      editor: false,
      editMode: 'REGIST',
      editModel: this.$CollectionResult(),
      isDelete: false,
      loading: false,
    }
  },
  /******************************************************************
   * WATCH
   ******************************************************************/
  watch: {
    editor(v) {
      if (!v) this.initialize()
    },
  },
  /******************************************************************
   * METHODS
   ******************************************************************/
  methods: {
    initialize() {
      const { site } = { ...this.editModel }
      this.editModel.initialize({ site })
      this.$refs.form.resetValidation()
      this.editMode = 'REGIST'
      this.isDelete = false
    },
    async submit(mode) {
      try {
        this.loading = true
        if (mode === 'REGIST') await this.editModel.create()
        if (mode === 'UPDATE') await this.editModel.update()
        if (mode === 'DELETE') await this.editModel.delete()
        this.editor = false
      } catch (err) {
        // eslint-disable-next-line
        console.error(err)
        alert(err.message)
      } finally {
        this.loading = false
      }
    },
    async onClickSubmit() {
      if (this.isDelete) await this.submit('DELETE')
      if (!this.isDelete) await this.submit(this.editMode)
    },
    onClickCancel() {
      this.editor = false
    },
    onClickEdit(item) {
      this.editMode = 'UPDATE'
      this.editModel.initialize(item)
      this.editor = true
    },
  },
}
</script>

<template>
  <air-template-default label="回収実績管理" show-itembar>
    <template #itembar-items>
      <a-autocomplete-site
        v-model="editModel.site"
        class="mr-4"
        label="排出場所"
        return-object
        hide-details
      />
      <v-dialog v-model="editor" max-width="600">
        <template #activator="{ attrs, on }">
          <v-btn v-bind="attrs" :disabled="!editModel.site" icon v-on="on"
            ><v-icon>mdi-plus</v-icon></v-btn
          >
        </template>
        <air-card-form-input
          ref="form"
          :loading="loading"
          outlined
          @click:cancel="onClickCancel"
          @click:submit="onClickSubmit"
        >
          <v-card-text>
            <h-input-collection-result
              v-bind.sync="editModel"
              :edit-mode="editMode"
              :disabled="loading"
            />
          </v-card-text>
        </air-card-form-input>
      </v-dialog>
    </template>
    <template #default="{ height }">
      <a-data-table-collection-results
        :site-id="editModel.site?.docId || undefined"
        :height="height"
        show-actions
        :selected-item="editModel"
        @click:edit="onClickEdit($event)"
      />
    </template>
  </air-template-default>
</template>

<style></style>
