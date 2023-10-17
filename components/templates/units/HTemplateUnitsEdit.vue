<script>
/**
 * @create 2023-10-06
 * @author shisyamo4131
 * @update 2023-10-10 methods.afterSubmit、methods.afterDeleteが
 *                    Promiseを返すように修正。
 */
import HInputUnit from '~/components/molecules/inputs/HInputUnit.vue'
import Mixin from '~/components/templates/mixins/HTemplateMixinsEditor.vue'
export default {
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: { HInputUnit },
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
      editModel: this.$Unit(),
    }
  },
  /******************************************************************
   * METHODS
   ******************************************************************/
  methods: {
    afterSubmit() {
      return new Promise((resolve) => {
        this.$router.replace(`/items/${this.editModel.docId}`)
        resolve()
      })
    },
    afterDelete() {
      return new Promise((resolve) => {
        this.$router.replace(`/items`)
        resolve()
      })
    },
  },
}
</script>

<template>
  <air-template-edit
    label="単位編集"
    edit-mode="UPDATE"
    :loading="loading"
    @click:submit="onClickSubmit($event)"
    @click:back="onClickBack"
  >
    <template #default="{ editMode }">
      <v-card-text>
        <h-input-unit v-bind.sync="editModel" :edit-mode="editMode" />
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
          この単位はシステム既定の為、削除できません。
        </v-alert>
      </v-card-text>
    </template>
  </air-template-edit>
</template>

<style></style>
