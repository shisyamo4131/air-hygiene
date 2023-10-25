<script>
/**
 * @create 2023-09-25
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
