<script>
/**
 * @author shisyamo4131
 */
import HInputCollectItem from '~/components/molecules/inputs/HInputCollectItem.vue'
import Mixin from '~/components/templates/mixins/HTemplateMixinsEditor.vue'
export default {
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: { HInputCollectItem },
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
      editModel: this.$CollectItem(),
    }
  },
  /******************************************************************
   * METHODS
   ******************************************************************/
  methods: {
    afterSubmit() {
      return new Promise((resolve) => {
        this.$router.replace(`/collect-items/${this.editModel.docId}`)
        resolve()
      })
    },
    afterDelete() {
      return new Promise((resolve) => {
        this.$router.replace(`/collect-items`)
        resolve()
      })
    },
  },
}
</script>

<template>
  <air-template-edit
    label="回収品目編集"
    edit-mode="UPDATE"
    :loading="loading"
    @click:submit="onClickSubmit($event)"
    @click:back="onClickBack"
  >
    <template #default="{ editMode }">
      <v-card-text>
        <h-input-collect-item v-bind.sync="editModel" :edit-mode="editMode" />
        <air-dialog-confirm-delete
          v-if="editModel.deletable"
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
        <v-alert v-else dense type="info">
          この回収品目はシステム既定の為、削除できません。
        </v-alert>
      </v-card-text>
    </template>
  </air-template-edit>
</template>

<style></style>
