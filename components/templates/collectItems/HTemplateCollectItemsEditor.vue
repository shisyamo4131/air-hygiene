<script>
/**
 * @author shisyamo4131
 */
import MInputCollectItem from '~/components/molecules/inputs/MInputCollectItem.vue'
import Mixin from '~/components/templates/mixins/HTemplateMixinsEditor.vue'

export default {
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: { MInputCollectItem },
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
    afterSubmit(mode) {
      return new Promise((resolve) => {
        if (mode === 'REGIST' || mode === 'UPDATE') {
          this.$router.replace(`/collect-Items/${this.editModel.docId}`)
        } else {
          this.$router.replace(`/collect-Items`)
        }
        resolve()
      })
    },
  },
}
</script>

<template>
  <air-template-edit
    label="回収品目編集"
    :edit-mode="editMode"
    :loading="loading"
    @click:submit="onClickSubmit($event)"
    @click:back="onClickBack"
  >
    <template #itembar-items> </template>
    <template #default="{ editMode }">
      <v-card-text>
        <m-input-collect-Item v-bind.sync="editModel" :edit-mode="editMode" />
        <air-dialog-confirm-delete
          v-if="editMode !== 'REGIST'"
          @click:delete="onClickDelete"
        >
          <template #activator="{ attrs, on }">
            <v-btn
              v-bind="attrs"
              color="error"
              :disabled="loading || !editModel.deletable"
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
