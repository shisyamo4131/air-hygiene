<script>
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
      const { date, siteId } = { ...this.editModel }
      this.editModel.initialize({ date, siteId })
      this.$refs.form.resetValidation()
      this.editMode = 'REGIST'
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
  <air-template-default>
    <template #default="{ height }">
      <v-container fluid>
        <v-row>
          <v-col cols="12">
            <v-form ref="form" :disabled="loading">
              <h-input-collection-result v-bind.sync="editModel" />
            </v-form>
            <v-toolbar dense>
              <h-btn-cancel :disabled="loading" @click="onClickCancel" />
              <v-spacer />
              <a-switch
                v-if="editMode !== 'REGIST'"
                v-model="isDelete"
                class="mr-4"
                label="この回収実績を削除する"
                hide-details
              />
              <h-btn-submit
                :disabled="loading"
                :loading="loading"
                @click="onClickSubmit"
              />
            </v-toolbar>
          </v-col>
          <v-col cols="12">
            <h-data-table-collection-results
              :site-id="editModel.siteId"
              :height="height - 580"
              show-actions
              @click:edit="onClickEdit($event)"
            />
          </v-col>
        </v-row>
      </v-container>
    </template>
  </air-template-default>
</template>

<style></style>
