<script>
/**
  ### ADataTable

  A data table component that adds the following functionality to v-data-table

  ‐ Added buttons to trigger registering, editing, and deleting data.
  - Changed the height property to be the height of the entire component.

  #### PROPERTIES

  | name              | type           | default                                                                | required | remarks | 
  | ----------------- | -------------- | ---------------------------------------------------------------------- | :------: | ------- | 
  | actionColumn      | object         | { text: 'actions', value: 'actions', align: 'right', sortable: false } | false    |         | 
  | deleteIcon        | string         | mdi-trash-can                                                          | false    |         | 
  | disableDelete     | boolean        | false                                                                  | false    |         | 
  | disableEdit       | boolean        | false                                                                  | false    |         | 
  | disableRegist     | boolean        | false                                                                  | false    |         | 
  | editIcon          | string         | mdi-pencil                                                             | false    |         | 
  | headers           | array          | []                                                                     | false    |         | 
  | height            | number, string | undefined                                                              | false    |         | 
  | hideDefaultFooter | boolean        | false                                                                  | false    |         | 
  | items             | array          | []                                                                     | false    |         | 
  | label             | string         | undefined                                                              | false    |         | 
  | registIcon        | string         | mdi-plus                                                               | false    |         | 
  | showActions       | boolean        | false                                                                  | false    |         | 
  | showToolbar       | boolean        | false                                                                  | false    |         | 
  
  #### SLOTS

  | name        | remarks                                              | 
  | ----------- | ---------------------------------------------------- | 
  | delete-icon | for delete icon.                                     | 
  | edit-icon   | for edit icon.                                       | 
  | regist-icon | for regist icon.  This slot is included in top slot. | 

  #### EVENTS

  | name         | params | remarks                            | 
  | ------------ | ------ | ---------------------------------- | 
  | click:delete | item   | emits when delete icon is clicked. | 
  | click:edit   | item   | emits when edit icon is clicked.   | 
  | click:regist |        | emits when regist icon is clicked. | 

  @author shisyamo4131
 */
export default {
  /******************************************************************
   * PROPS
   ******************************************************************/
  props: {
    actionsColumn: {
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
    deleteIcon: { type: String, default: 'mdi-trash-can', required: false },
    disableDelete: { type: Boolean, default: false, required: false },
    disableEdit: { type: Boolean, default: false, required: false },
    disableRegist: { type: Boolean, default: false, required: false },
    editIcon: { type: String, default: 'mdi-pencil', required: false },
    headers: { type: Array, default: () => [], required: false },
    height: { type: [Number, String], default: undefined, required: false },
    hideDefaultFooter: { type: Boolean, default: false, required: false },
    items: { type: Array, default: () => [], required: false },
    label: { type: String, default: undefined, required: false },
    registIcon: { type: String, default: 'mdi-plus', required: false },
    showActions: { type: Boolean, default: false, required: false },
    showToolbar: { type: Boolean, default: false, required: false },
  },
  /******************************************************************
   * COMPUTED
   ******************************************************************/
  computed: {
    footerHeight() {
      if (this.hideDefaultFooter) return 0
      return 59
    },
    internalHeaders() {
      const result = this.headers.map((item) => item)
      if (this.showActions) result.push(this.actionsColumn)
      return result
    },
    internalHeight() {
      if (!this.height) return undefined
      return this.height - this.toolbarHeight - this.footerHeight
    },
    toolbarHeight() {
      if (!this.showToolbar) return 0
      return this.$vuetify.breakpoint.smAndDown ? 56 : 64
    },
  },
  /******************************************************************
   * METHODS
   ******************************************************************/
  methods: {
    onClickRegist() {
      this.$emit('click:regist')
    },
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
    :height="internalHeight"
    :items="items"
    v-on="$listeners"
  >
    <template #top>
      <slot name="top">
        <v-toolbar v-if="showToolbar" flat>
          <v-toolbar-title>{{ label }}</v-toolbar-title>
          <v-divider class="ml-4" vertical />
          <v-spacer />
          <!-- Provides regist-icon slot. -->
          <slot
            name="regist-icon"
            :attrs="{ disabled: disableRegist, height: toolbarHeight }"
            :on="{ click: () => onClickRegist() }"
          >
            <v-icon :disabled="disableRegist" icon @click="onClickRegist()">
              {{ registIcon }}
            </v-icon>
          </slot>
        </v-toolbar>
      </slot>
    </template>
    <template v-if="showActions" #[`item.actions`]="{ item }">
      <!-- Provides edit-icon slot. -->
      <slot
        name="edit-icon"
        :attrs="{ disabled: disableEdit, class: { 'mr-2': true } }"
        :on="{ click: () => onClickEdit(item) }"
      >
        <v-icon :disabled="disableEdit" class="mr-2" @click="onClickEdit(item)">
          {{ editIcon }}
        </v-icon>
      </slot>
      <!-- Provides delete-icon slot. -->
      <slot
        name="delete-icon"
        :attrs="{ disabled: disableDelete }"
        :on="{ click: () => onClickDelete(item) }"
      >
        <v-icon :disabled="disableDelete" @click="onClickDelete(item)">
          {{ deleteIcon }}
        </v-icon>
      </slot>
    </template>
    <!-- Provides other slots. -->
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
