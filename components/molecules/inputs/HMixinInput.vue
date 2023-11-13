<script>
/**
 * ### HInputMixin
 *
 * - A mixin for input-component.
 *
 * #### PROPERTIES
 *
 * | name     | type   | required | description |
 * | :------- | :----- | :------: | :---------- |
 * | editMode | string | true     |             |
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
      validator: (v) => ['REGIST', 'UPDATE', 'DELETE'].includes(v),
      required: true,
    },
    loading: { type: Boolean, default: false, required: false },
  },
}
</script>
