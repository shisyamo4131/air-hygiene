<script>
/**
 * @author shisyamo4131
 */
import ASwitch from '~/components/atoms/inputs/ASwitch.vue'
import HBtnCancel from '~/components/molecules/btns/HBtnCancel.vue'
import HBtnSubmit from '~/components/molecules/btns/HBtnSubmit.vue'
import HInputCollectionResult from '~/components/molecules/inputs/HInputCollectionResult.vue'
import HDataTableCollectionResults from '~/components/molecules/tables/HDataTableCollectionResults.vue'
export default {
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: {
    HInputCollectionResult,
    HDataTableCollectionResults,
    ASwitch,
    HBtnSubmit,
    HBtnCancel,
  },
  /******************************************************************
   * DATA
   ******************************************************************/
  data() {
    return {
      editMode: 'REGIST',
      editModel: this.$CollectionResult(),
      isDelete: false,
      loading: false,
    }
  },
  /******************************************************************
   * METHODS
   ******************************************************************/
  methods: {
    initialize() {
      const { date, site } = { ...this.editModel }
      this.editModel.initialize({ date, site })
      this.$refs.form.resetValidation()
      this.editMode = 'REGIST'
      this.isDelete = false
    },
    validate() {
      const result = this.$refs.form.validate()
      if (!result) {
        alert('入力に不備があります')
      }
      return result
    },
    async submit(mode) {
      try {
        this.loading = true
        if (!this.validate()) return
        if (mode === 'REGIST') await this.editModel.create()
        if (mode === 'UPDATE') await this.editModel.update()
        if (mode === 'DELETE') await this.editModel.delete()
        this.initialize()
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
      this.initialize()
    },
    onClickEdit(item) {
      this.$refs.form.resetValidation()
      this.editMode = 'UPDATE'
      this.editModel.initialize(item)
    },
  },
}
</script>

<template>
  <air-template-default label="回収実績管理">
    <template #default="{ height }">
      <v-container fluid>
        <v-row>
          <v-col cols="12" lg="4">
            <v-form ref="form" :disabled="loading">
              <h-input-collection-result v-bind.sync="editModel" />
            </v-form>
            <v-expand-transition>
              <a-switch
                v-show="editMode !== 'REGIST'"
                v-model="isDelete"
                class="mt-0"
                label="この回収実績を削除する"
              />
            </v-expand-transition>
            <v-toolbar dense>
              <h-btn-cancel :disabled="loading" @click="onClickCancel" />
              <v-spacer />
              <h-btn-submit
                :disabled="loading"
                :loading="loading"
                @click="onClickSubmit"
              />
            </v-toolbar>
          </v-col>
          <v-col cols="12" lg="8">
            <h-data-table-collection-results
              :site-id="editModel.site?.docId || undefined"
              :height="height - 24"
              show-actions
              :selected-item="editModel"
              @click:edit="onClickEdit($event)"
            />
          </v-col>
        </v-row>
      </v-container>
    </template>
  </air-template-default>
</template>

<style></style>
