<script>
/**
 * @author shisyamo4131
 */
export default {
  /******************************************************************
   * PROPS
   ******************************************************************/
  props: {
    disableDelete: { type: Boolean, default: false, required: false },
    disableEdit: { type: Boolean, default: false, required: false },
    headers: { type: Array, default: () => [], required: false },
    iconDelete: { type: String, default: 'mdi-trash-can', required: false },
    iconEdit: { type: String, default: 'mdi-pencil', required: false },
    items: { type: Array, default: () => [], required: false },
    showActions: { type: Boolean, default: false, required: false },
  },
  /******************************************************************
   * COMPUTED
   ******************************************************************/
  computed: {
    internalHeaders() {
      const result = this.headers.map((item) => item)
      if (this.showActions) {
        result.push({
          text: 'actions',
          value: 'actions',
          align: 'right',
          sortable: false,
        })
      }
      return result
    },
  },
  /******************************************************************
   * METHODS
   ******************************************************************/
  methods: {
    onClickEdit(item) {
      const index = this.items.indexOf(item)
      this.$emit('click:edit', index)
    },
    onClickDelete(item) {
      const index = this.items.indexOf(item)
      this.$emit('click:delete', index)
    },
  },
}
</script>

<template>
  <v-data-table
    v-bind="$attrs"
    :headers="internalHeaders"
    :items="items"
    v-on="$listeners"
  >
    <template v-if="showActions" #[`item.actions`]="{ item }">
      <slot
        name="edit-icon"
        :attrs="{ disabled: disableEdit, class: { 'mr-2': true } }"
        :on="{ click: () => onClickEdit(item) }"
      >
        <v-icon :disabled="disableEdit" class="mr-2" @click="onClickEdit(item)">
          {{ iconEdit }}
        </v-icon>
      </slot>
      <slot
        name="delete-icon"
        :attrs="{ disabled: disableDelete }"
        :on="{ click: () => onClickDelete(item) }"
      >
        <v-icon :disabled="disableDelete" @click="onClickDelete(item)">
          {{ iconDelete }}
        </v-icon>
      </slot>
    </template>
    <template
      v-for="(_, scopedSlotName) in $scopedSlots"
      #[scopedSlotName]="slotData"
    >
      <slot :name="scopedSlotName" v-bind="slotData" />
    </template>
    <template v-for="(_, slotName) in $slots" #[slotName]>
      <slot :name="slotName" />
    </template>
  </v-data-table>
</template>

<style></style>
