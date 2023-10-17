<script>
/**
 * @create 2023-10-02
 * @author shisyamo4131
 */
import { VRadioGroup } from 'vuetify/lib'
export default {
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: { VRadioGroup },
  /******************************************************************
   * MODEL
   ******************************************************************/
  model: { prop: 'value', event: 'change' },
  /******************************************************************
   * RENDER
   ******************************************************************/
  render(createElement) {
    const slots = Object.keys(this.$slots).map((slot) =>
      createElement('template', { slot }, this.$slots[slot])
    )
    return createElement(
      VRadioGroup,
      {
        attrs: { ...this.$attrs },
        on: this.$listeners,
        scopedSlots: this.$scopedSlots,
      },
      slots
    )
  },
}
</script>
