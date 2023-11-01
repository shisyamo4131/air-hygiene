<script>
/**
 * ### HInputCollectionResultDetails
 *
 * @author shisyamo4131
 */
import HDataTableCollectionResultDetails from '../../atoms/tables/HDataTableCollectionResultDetails.vue'
import HInputCollectionResultDetail from './HInputCollectionResultDetail.vue'
import AMixinArrayInput from '~/components/atoms/mixins/AMixinArrayInput.vue'
export default {
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: {
    HDataTableCollectionResultDetails,
    HInputCollectionResultDetail,
  },
  /******************************************************************
   * MIXINS
   ******************************************************************/
  mixins: [AMixinArrayInput],
  /******************************************************************
   * PROPS
   ******************************************************************/
  props: {
    siteId: { type: String, required: true },
    date: { type: String, required: true },
  },
  /******************************************************************
   * DATA
   ******************************************************************/
  data() {
    return {
      editModel: this.$CollectionResultDetail(),
      loading: {
        unitPrice: false,
      },
    }
  },
  /******************************************************************
   * METHODS
   ******************************************************************/
  methods: {
    beforeRegist() {
      return new Promise((resolve) => {
        const isDuplicated = this.value.some(
          ({ id }) => id === this.editModel.id
        )
        if (isDuplicated) {
          alert('既に登録されている回収品目・単位の組み合わせです。')
          resolve(false)
          return
        }
        resolve(true)
      })
    },
    async setUnitPrice() {
      try {
        this.loading.unitPrice = true
        await this.editModel.setUnitPrice(this.siteId, this.date)
      } catch (err) {
        // eslint-disable-next-line
        console.error(err)
        alert(err.message)
      } finally {
        this.loading.unitPrice = false
      }
    },
  },
}
</script>

<template>
  <div>
    <v-dialog v-model="editor" persistent max-width="360">
      <air-card-form-input
        ref="form"
        outlined
        @click:cancel="editor = false"
        @click:submit="onClickSubmit"
      >
        <v-card-text>
          <h-input-collection-result-detail
            v-bind.sync="editModel"
            :edit-mode="editMode"
            :loading-unit-price="loading.unitPrice"
            @change:collectItemId="setUnitPrice()"
            @change:unitId="setUnitPrice()"
          />
        </v-card-text>
      </air-card-form-input>
    </v-dialog>
    <h-data-table-collection-result-details
      :items="value"
      hide-default-footer
      :items-per-page="-1"
      label="回収実績明細"
      show-actions
      @click:regist="onClickRegist()"
      @click:edit="onClickEdit($event)"
      @click:delete="onClickDelete($event)"
    >
    </h-data-table-collection-result-details>
  </div>
</template>

<style></style>
