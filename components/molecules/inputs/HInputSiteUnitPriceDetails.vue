<script>
/**
 * ### HInputSiteUnitPriceDetails
 *
 * @author shisyamo4131
 */
import HDataTableSiteUnitPriceDetails from '../../atoms/tables/HDataTableSiteUnitPriceDetails.vue'
import HInputSiteUnitPriceDetail from './HInputSiteUnitPriceDetail.vue'
import AMixinArrayInput from '~/components/atoms/mixins/AMixinArrayInput.vue'
export default {
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: { HDataTableSiteUnitPriceDetails, HInputSiteUnitPriceDetail },
  /******************************************************************
   * MIXINS
   ******************************************************************/
  mixins: [AMixinArrayInput],
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
          <h-input-site-unit-price-detail
            v-bind.sync="editModel"
            :edit-mode="editMode"
          />
        </v-card-text>
      </air-card-form-input>
    </v-dialog>
    <h-data-table-site-unit-price-details
      :items="value"
      hide-default-footer
      :items-per-page="-1"
      label="品目別回収単価"
      show-actions
      @click:regist="onClickRegist()"
      @click:edit="onClickEdit($event)"
      @click:delete="onClickDelete($event)"
    >
    </h-data-table-site-unit-price-details>
  </div>
</template>

<style></style>
