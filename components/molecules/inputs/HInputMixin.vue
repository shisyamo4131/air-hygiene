<script>
/**
 * ### HInputMixin
 * Inputコンポーネント用のMixinです。
 * A mixin for input-components.
 *
 * #### PROPERTIES
 *
 * | name             | type    | required | remarks            |
 * | :---             | :---    | :---:    | :---               |
 * | editMode         | string  | false    |                    |
 * | disabled         | boolean | false    |                    |
 *
 * @author shisyamo4131
 */
export default {
  /******************************************************************
   * PROPS
   ******************************************************************/
  props: {
    disabled: { type: Boolean, default: false, required: false },
    editMode: {
      type: String,
      default: 'REGIST',
      validator: (v) => ['REGIST', 'UPDATE', 'DELETE'].includes(v),
      required: false,
    },
  },
}
</script>
