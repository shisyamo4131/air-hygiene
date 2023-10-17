<script>
/**
 * Firestore用データモデルの各種InputコンポーネントにValidation、Initialize、
 * Submitの機能を追加したCardコンポーネントです。
 * defaultスロットにInputコンポーネントを指定し、スロットプロパティを使用します。
 * ```vue
 * <template #default="{ attrs, on }"
 *  <input v-bind="attrs" v-on="on" />
 * </template>
 * ```
 * Inputコンポーネントの各種プロパティへの双方向バインディングが適用されます。
 *
 * ### PROPS
 *
 * #### args
 * Firestore用データモデルの読み込みに際して指定する引数を配列で指定します。
 * サブコレクションとして使用するデータモデルである場合に指定します。
 *
 * #### collection
 * 読み込むFirestore用データモデルの名前（コレクション名）を指定します。
 *
 * #### edit-mode
 * 編集モード（REGIST、UPDATE、DELETE）を指定します。
 *
 * #### label
 * Cardコンポーネントのv-card-titleにバインドされます。
 *
 * #### model
 * 初期表示に使用するデータモデルです。
 *
 * ### SLOTS
 *
 * #### default
 * 各種Inputコンポーネント用のスロットです。
 * ```
 * { editMode, loading, ...editModel }
 * ```
 *
 * ### EVENTS
 *
 * #### submitted
 * Firestoreへの処理が完了した時にemitされます。
 *
 * ### FUNCTIONS
 * #### initialize()
 * Inputコンポーネントの内容をprops.modelの内容で初期化し、検証状態を元に戻します。
 *
 * #### validate()
 * Inputコンポーネントの内容を検証します。検証方法はInputコンポーネントに依存します。
 *
 * #### submit()
 * props.editModeに応じたFirestoreへの処理を行います。
 *
 * @create 2023-10-09
 * @author shisyamo4131
 */
export default {
  /******************************************************************
   * PROPS
   ******************************************************************/
  props: {
    args: { type: Array, default: () => [], required: false },
    collection: { type: String, required: true },
    editMode: {
      type: String,
      validator: (v) => ['REGIST', 'UPDATE', 'DELETE'].includes(v),
      required: true,
    },
    hideActions: { type: Boolean, default: false, required: false },
    label: { type: String, default: undefined, required: false },
    model: { type: Object, default: null, required: false },
  },
  /******************************************************************
   * DATA
   ******************************************************************/
  data() {
    return {
      editModel: this[`$${this.collection}`](...this.args),
      loading: false,
    }
  },
  /******************************************************************
   * COMPUTED
   ******************************************************************/
  computed: {
    attrs() {
      return {
        editMode: this.editMode,
        loading: this.loading,
        ...(this.editModel || {}),
      }
    },
    on() {
      if (!this.editModel || !Object.keys(this.editModel).length)
        return undefined
      const events = {}
      Object.keys(this.editModel).forEach((field) => {
        events[`update:${field}`] = ($event) => {
          this.editModel[field] = $event
        }
      })
      return events
    },
  },
  /******************************************************************
   * WATCH
   ******************************************************************/
  watch: {
    model: {
      handler(v) {
        this.editModel.initialize(v)
      },
      immediate: true,
      deep: true,
    },
  },
  /******************************************************************
   * METHODS
   ******************************************************************/
  methods: {
    initialize() {
      this.editModel.initialize(this.model)
      const form = this.$refs?.form || undefined
      if (form) form.resetValidation()
    },
    validate() {
      const result = this.$refs.form.validate()
      if (!result) alert('入力内容に不備があります。')
      return result
    },
    async submit() {
      if (!this.validate()) return
      try {
        this.loading = true
        if (this.editMode === 'REGIST') await this.editModel.create()
        if (this.editMode === 'UPDATE') await this.editModel.update()
        if (this.editMode === 'DELETE') await this.editModel.delete()
        this.$emit('submitted')
      } catch (err) {
        // eslint-disable-next-line
        console.error(err)
        alert(err.message)
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<template>
  <v-card v-bind="$attrs" v-on="$listeners">
    <v-card-title v-if="label">{{ label }}</v-card-title>
    <v-card-text>
      <v-form v-bind="$attrs" ref="form" :disabled="loading" v-on="$listeners">
        <slot name="default" v-bind="{ attrs, on }" />
      </v-form>
    </v-card-text>
    <v-card-actions v-show="!hideActions" class="justify-space-between">
      <v-btn :disabled="loading" icon @click="$emit('click:cancel')">
        <v-icon>mdi-cancel</v-icon>
      </v-btn>
      <v-btn :disabled="loading" icon :loading="loading" @click="submit"
        ><v-icon>mdi-check</v-icon></v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<style></style>
