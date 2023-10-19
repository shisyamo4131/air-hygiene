<script>
/**
 * 編集ページ用MIXIN
 * @author shisyamo4131
 */
export default {
  /******************************************************************
   * PROPS
   ******************************************************************/
  props: {
    editMode: {
      type: String,
      validator: (v) => ['REGIST', 'UPDATE', 'DELETE'].includes(v),
      required: true,
    },
    model: { type: Object, default: undefined, required: false },
  },
  /******************************************************************
   * DATA
   ******************************************************************/
  data() {
    return {
      loading: false,
    }
  },
  /******************************************************************
   * MOUNTED
   ******************************************************************/
  mounted() {
    this.editModel.initialize(this.model)
  },
  /******************************************************************
   * METHODS
   ******************************************************************/
  methods: {
    async onClickSubmit(mode) {
      try {
        this.loading = true
        await this.beforeSubmit(mode)
        if (mode === 'REGIST') {
          await this.beforeCreate()
          await this.editModel.create()
          await this.afterCreate()
        }
        if (mode === 'UPDATE') {
          await this.beforeUpdate()
          await this.editModel.update()
          await this.afterUpdate()
        }
        if (mode === 'DELETE') {
          await this.beforeDelete()
          await this.editModel.delete()
          await this.afterDelete()
        }
        await this.afterSubmit(mode)
      } catch (err) {
        // eslint-disable-next-line
        console.error(err.message)
        alert(err.message)
      } finally {
        this.loading = false
      }
    },
    onClickBack() {
      this.$router.go(-1)
    },
    async onClickDelete() {
      await this.onClickSubmit('DELETE')
    },
    beforeSubmit(mode) {
      return new Promise((resolve) => {
        resolve()
      })
    },
    beforeCreate() {
      return new Promise((resolve) => {
        resolve()
      })
    },
    beforeUpdate() {
      return new Promise((resolve) => {
        resolve()
      })
    },
    beforeDelete() {
      return new Promise((resolve) => {
        resolve()
      })
    },
    afterSubmit(mode) {
      return new Promise((resolve) => {
        resolve()
      })
    },
    afterCreate() {
      return new Promise((resolve) => {
        resolve()
      })
    },
    afterUpdate() {
      return new Promise((resolve) => {
        resolve()
      })
    },
    afterDelete() {
      return new Promise((resolve) => {
        resolve()
      })
    },
  },
}
</script>
