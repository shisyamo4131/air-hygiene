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
      loading: {
        submit: false,
        unitPrice: false,
      },
      loaded: {
        unitPrice: false,
      },
    }
  },
  /******************************************************************
   * METHODS
   ******************************************************************/
  methods: {
    initialize() {
      const { date, site } = { ...this.editModel }
      this.editModel.initialize({ date, site })
      this.editModel.setDateDeadline()
      this.$refs.form.resetValidation()
      this.editMode = 'REGIST'
      this.isDelete = false
    },
    validate() {
      const result = this.$refs.form.validate()
      if (!result) alert('入力に不備があります')
      return result
    },
    async submit(mode) {
      try {
        this.loading.submit = true
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
        this.loading.submit = false
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
    onChangeDate() {
      this.editModel.setDateDeadline()
    },
    onChangeSite() {
      this.editModel.setDateDeadline()
    },
    async onChangeCollectItemId() {
      await this.setUnitPrice()
      this.copyAmountToConvertedWeight()
    },
    async onChangeUnitId() {
      await this.setUnitPrice()
      this.copyAmountToConvertedWeight()
    },
    onChangeAmount() {
      this.copyAmountToConvertedWeight()
    },
    async setUnitPrice() {
      try {
        this.loading.unitPrice = true
        this.loaded.unitPrice = await this.editModel.setUnitPrice()
      } catch (err) {
        // eslint-disable-next-line
        console.error(err)
        alert(err.message)
      } finally {
        this.loading.unitPrice = false
      }
    },
    copyAmountToConvertedWeight() {
      this.editModel.convertedWeight = null
      if (!this.editModel.collectItemId) return
      const collectItem = this.$store.getters['masters/CollectItem'](
        this.editModel.collectItemId
      )
      if (!collectItem) return
      if (!['municipal', 'industrial'].includes(collectItem.wasteDiv)) return
      if (!this.editModel.unitId) return
      const unit = this.$store.getters['masters/Unit'](this.editModel.unitId)
      if (!unit || unit.code !== '11') return
      this.editModel.convertedWeight = this.editModel.amount
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
            <v-form ref="form" :disabled="loading.submit">
              <h-input-collection-result
                v-bind.sync="editModel"
                @change:date="onChangeDate"
                @change:site="onChangeSite"
                @change:collectItemId="onChangeCollectItemId"
                @change:unitId="onChangeUnitId"
                @change:amount="onChangeAmount"
              />
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
              <h-btn-cancel
                :disabled="loading.submit || loading.unitPrice"
                @click="onClickCancel"
              />
              <v-spacer />
              <h-btn-submit
                :disabled="loading.submit || loading.unitPrice"
                :loading="loading.submit"
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
      <v-snackbar v-model="loaded.unitPrice" color="info" outlined centered>
        選択された排出場所の設定単価を取得しました。
      </v-snackbar>
    </template>
  </air-template-default>
</template>

<style></style>
