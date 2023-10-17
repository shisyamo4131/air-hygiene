<script>
/**
 * @author shisyamo4131
 */
export default {
  /******************************************************************
   * PROPS
   ******************************************************************/
  props: {
    actionColumn: {
      type: Object,
      default: () => {
        return {
          text: 'actions',
          value: 'actions',
          align: 'right',
          sortable: false,
        }
      },
    },
    headers: { type: Array, default: () => [], required: false },
    showActions: { type: Boolean, default: false, required: false },
    disableEdit: { type: Boolean, default: false, required: false },
    disableDelete: { type: Boolean, default: false, required: false },
  },
  /******************************************************************
   * COMPUTED
   ******************************************************************/
  computed: {
    internalHeaders() {
      return this.headers.concat(this.actionColumn)
    },
  },
}
</script>

<template>
  <v-data-table v-bind="$attrs" :headers="internalHeaders" v-on="$listeners">
    <template v-if="showActions" #[`item.actions`]="{ index }">
      <slot
        name="edit-icon"
        v-bind="{
          attrs: { disabled: disableEdit, class: { 'mr-2': true } },
          on: { click: $emit('click:edit', index) },
        }"
      >
        <v-icon
          class="mr-2"
          :disabled="disableEdit"
          @click="$emit('click:edit', index)"
        >
          mdi-pencil
        </v-icon>
      </slot>
      <slot
        name="delete-icon"
        v-bind="{
          attrs: { disabled: disableDelete },
          on: { click: $emit('click:delete', index) },
        }"
      >
        <v-icon :disabled="disableDelete" @click="$emit('click:delete', index)"
          >mdi-trash-can</v-icon
        >
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
