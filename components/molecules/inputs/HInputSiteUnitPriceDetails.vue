<script>
/**
 * ### MInputSiteUnitPriceDetails
 *
 * @author shisyamo4131
 */
import ADataTableSiteUnitPriceDetails from '../../atoms/tables/ADataTableSiteUnitPriceDetails.vue'
import MInputSiteUnitPriceDetail from './MInputSiteUnitPriceDetail.vue'
import AMixinArrayInput from '~/components/atoms/mixins/AMixinArrayInput.vue'
export default {
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: { ADataTableSiteUnitPriceDetails, MInputSiteUnitPriceDetail },
  /******************************************************************
   * MIXINS
   ******************************************************************/
  mixins: [AMixinArrayInput],
  /******************************************************************
   * DATA
   ******************************************************************/
  data() {
    return {
      editModel: this.$SiteUnitPriceDetail(),
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
    <v-toolbar dense flat>
      <v-toolbar-title class="text-subtitle-1">品目別回収単価</v-toolbar-title>
      <v-spacer />
      <v-dialog v-model="editor" persistent max-width="360">
        <template #activator="{ attrs, on }">
          <v-btn v-bind="attrs" icon v-on="on"><v-icon>mdi-plus</v-icon></v-btn>
        </template>
        <air-card-form-input
          ref="form"
          outlined
          @click:cancel="editor = false"
          @click:submit="onClickSubmit"
        >
          <v-card-text>
            <m-input-site-unit-price-detail
              v-bind.sync="editModel"
              :edit-mode="editMode"
            />
          </v-card-text>
        </air-card-form-input>
      </v-dialog>
    </v-toolbar>
    <a-data-table-site-unit-price-details
      :items="value"
      hide-default-footer
      :items-per-page="-1"
      label="品目別回収単価"
      show-actions
      @click:edit="onClickEdit($event)"
      @click:delete="onClickDelete($event)"
    >
    </a-data-table-site-unit-price-details>
  </div>
</template>

<style></style>
