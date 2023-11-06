<script>
/**
 * ### MInputCollectionResultDetails
 *
 * @author shisyamo4131
 */
import ADataTableCollectionResultDetails from '../../atoms/tables/ADataTableCollectionResultDetails.vue'
import MInputCollectionResultDetail from './MInputCollectionResultDetail.vue'
import MMixinArrayInput from '~/components/molecules/mixins/MMixinArrayInput.vue'
export default {
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: {
    ADataTableCollectionResultDetails,
    MInputCollectionResultDetail,
  },
  /******************************************************************
   * MIXINS
   ******************************************************************/
  mixins: [MMixinArrayInput],
  /******************************************************************
   * PROPS
   ******************************************************************/
  props: {
    siteId: { type: String, required: true },
    date: { type: String, required: true },
    value: { type: Array, default: () => [], required: false },
  },
  /******************************************************************
   * DATA
   ******************************************************************/
  data() {
    return {
      editModel: this.$CollectionResultDetail(),
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
          <m-input-collection-result-detail
            v-bind.sync="editModel"
            :edit-mode="editMode"
            :site-id="siteId"
            :date="date"
          />
        </v-card-text>
      </air-card-form-input>
    </v-dialog>
    <a-data-table-collection-result-details
      :items="value"
      hide-default-footer
      :items-per-page="-1"
      label="回収実績明細"
      show-actions
      @click:regist="onClickRegist()"
      @click:edit="onClickEdit($event)"
      @click:delete="onClickDelete($event)"
    >
    </a-data-table-collection-result-details>
  </div>
</template>

<style></style>
