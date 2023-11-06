<script>
/**
 * @author shisyamo4131
 */
import MInputCustomer from '~/components/molecules/inputs/MInputCustomer.vue'
import Mixin from '~/components/templates/mixins/HTemplateMixinsEditor.vue'

export default {
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: { MInputCustomer },
  /******************************************************************
   * MIXINS
   ******************************************************************/
  mixins: [Mixin],
  /******************************************************************
   * PROPS
   ******************************************************************/
  props: {},
  /******************************************************************
   * DATA
   ******************************************************************/
  data() {
    return {
      editModel: this.$Customer(),
    }
  },
  /******************************************************************
   * METHODS
   ******************************************************************/
  methods: {
    afterSubmit(mode) {
      return new Promise((resolve) => {
        if (mode === 'REGIST' || mode === 'UPDATE') {
          this.$router.replace(`/customers/${this.editModel.docId}`)
        } else {
          this.$router.replace(`/customers`)
        }
        resolve()
      })
    },
  },
}
</script>

<template>
  <air-template-edit
    label="取引先編集"
    :edit-mode="editMode"
    :loading="loading"
    @click:submit="onClickSubmit($event)"
    @click:back="onClickBack"
  >
    <template #itembar-items> </template>
    <template #default="{ editMode }">
      <v-card-text>
        <m-input-customer v-bind.sync="editModel" :edit-mode="editMode" />
        <air-dialog-confirm-delete
          v-if="editMode !== 'REGIST'"
          @click:delete="onClickDelete"
        >
          <template #activator="{ attrs, on }">
            <v-btn
              v-bind="attrs"
              color="error"
              :disabled="loading"
              small
              v-on="on"
              >削除する</v-btn
            >
          </template>
        </air-dialog-confirm-delete>
      </v-card-text>
    </template>
  </air-template-edit>
</template>

<style></style>
