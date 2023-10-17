<script>
/**
 * @author shisyamo4131
 */
import HInputCustomer from '~/components/molecules/inputs/HInputCustomer.vue'
import Mixin from '~/components/templates/mixins/HTemplateMixinsEditor.vue'
export default {
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: { HInputCustomer },
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
    edit-mode="REGIST"
    :loading="loading"
    @click:submit="onClickSubmit($event)"
    @click:back="onClickBack"
  >
    <template #default="{ editMode }">
      <v-card-text>
        <h-input-customer v-bind.sync="editModel" :edit-mode="editMode" />
      </v-card-text>
    </template>
  </air-template-edit>
</template>

<style></style>
