<script>
/**
 * ### MInputMixin
 *
 * - A mixin for input-component.
 *
 * #### PROPERTIES
 *
 * | name             | type    | required | remarks            |
 * | :---             | :---    | :---:    | :---               |
 * | editMode         | string  | false    |                    |
 *
 * @author shisyamo4131
 */
export default {
  /******************************************************************
   * PROPS
   ******************************************************************/
  props: {
    editMode: {
      type: String,
      default: 'REGIST',
      validator: (v) => ['REGIST', 'UPDATE', 'DELETE'].includes(v),
      required: false,
    },
  },
}
</script>
