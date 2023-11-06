<script>
/**
 * ### ADataTable
 *
 * ‐ The footer height is subtracted when the height property is specified.
 * - The 'show-actions' property provides edit-icon and delete-icon.
 *
 * #### PROPERTIES
 * | name        | type    | default | required | description |
 * | ----------- | ------- | ------- | -------- | ----------- |
 * | showActions | boolean | false   | false    |             |
 *
 * #### EVENTS
 * | name         | description                        |
 * | ------------ | ---------------------------------- |
 * | click:edit   | Emits when edit-icon is clicked.   |
 * | click:delete | Emits when delete-icon is clicked. |
 *
 * @author shisyamo4131
 */
export default {
  /******************************************************************
   * PROPS
   ******************************************************************/
  props: {
    showActions: { type: Boolean, default: false, required: false },
  },
  /******************************************************************
   * COMPUTED
   ******************************************************************/
  computed: {
    footerHeight() {
      const hideDefaultFooter = this.$attrs?.hideDefaultFooter
      if (!hideDefaultFooter) return 0
      return 59
    },
    internalHeaders() {
      if (!this.showActions) return this.$attrs?.headers || []
      const actions = {
        text: 'actions',
        value: 'actions',
        align: 'right',
        sortable: false,
      }
      const result = (this.$attrs?.headers || []).map((item) => item)
      result.push(actions)
      return result
    },
    internalHeight() {
      const height = this.$attrs?.height || undefined
      if (!height) return undefined
      return height - this.footerHeight
    },
  },
}
</script>

<template>
  <v-data-table
    v-bind="{ ...$attrs, height: internalHeight, headers: internalHeaders }"
    v-on="$listeners"
  >
    <template
      v-for="(_, scopedSlotName) in $scopedSlots"
      #[scopedSlotName]="slotData"
    >
      <slot :name="scopedSlotName" v-bind="slotData" />
    </template>
    <template v-for="(_, slotName) in $slots" #[slotName]>
      <slot :name="slotName" />
    </template>
    <template #[`item.actions`]="{ item }">
      <v-icon color="green" class="mr-2" @click="$emit('click:edit', item)"
        >mdi-pencil</v-icon
      >
      <v-icon color="red" @click="$emit('click:delete', item)"
        >mdi-trash-can</v-icon
      >
    </template>
  </v-data-table>
</template>

<style></style>
