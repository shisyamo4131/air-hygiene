<script>
/**
  ### ADataTable

  v-data-tableにデータを登録、編集、削除するためのトリガーとなるボタンを
  追加したコンポーネントです。

  #### PROPERTIES

  | name          | type    | default       | required | remarks | 
  | ------------- | ------- | ------------- | :------: | ------- | 
  | deleteIcon    | string  | mdi-trash-can | false    |         | 
  | disableDelete | boolean | false         | false    |         | 
  | disableEdit   | boolean | false         | false    |         | 
  | disableRegist | boolean | false         | false    |         | 
  | editIcon      | string  | mdi-pencil    | false    |         | 
  | headers       | array   | []            | false    |         | 
  | items         | array   | []            | false    |         | 
  | label         | string  | undefined     | false    |         | 
  | registIcon    | string  | mdi-plus      | false    |         | 
  | showActions   | boolean | false         | false    |         | 
  | showToolbar   | boolean | false         | false    |         | 

  @author shisyamo4131
 */
export default {
  /******************************************************************
   * PROPS
   ******************************************************************/
  props: {
    deleteIcon: { type: String, default: 'mdi-trash-can', required: false },
    disableDelete: { type: Boolean, default: false, required: false },
    disableEdit: { type: Boolean, default: false, required: false },
    disableRegist: { type: Boolean, default: false, required: false },
    editIcon: { type: String, default: 'mdi-pencil', required: false },
    headers: { type: Array, default: () => [], required: false },
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
    :items="items"
    v-on="$listeners"
  >
    <!-- Provides toolbar slot. -->
    <template #top>
      <v-toolbar v-if="showToolbar" flat>
        <v-toolbar-title>{{ label }}</v-toolbar-title>
        <v-divider class="ml-4" vertical />
        <v-spacer />
        <slot
          name="regist-icon"
          :attrs="{ disabled: disableRegist }"
          :on="{ click: () => onClickRegist() }"
        >
          <v-icon :disabled="disableRegist" icon @click="onClickRegist()">
            {{ registIcon }}
          </v-icon>
        </slot>
      </v-toolbar>
    </template>
    <!-- Provides actions slot. -->
    <template v-if="showActions" #[`item.actions`]="{ item }">
      <slot
        name="edit-icon"
        :attrs="{ disabled: disableEdit, class: { 'mr-2': true } }"
        :on="{ click: () => onClickEdit(item) }"
      >
        <v-icon :disabled="disableEdit" class="mr-2" @click="onClickEdit(item)">
          {{ editIcon }}
        </v-icon>
      </slot>
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
