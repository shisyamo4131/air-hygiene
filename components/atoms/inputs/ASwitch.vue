<script>
/**
 * @create 2023-09-25
 * @author shisyamo4131
 */
import { VSwitch } from 'vuetify/lib'
export default {
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: { VSwitch },
  /******************************************************************
   * MODEL
   ******************************************************************/
  model: { prop: 'inputValue', event: 'change' },
  /******************************************************************
   * RENDER
   ******************************************************************/
  render(createElement) {
    const slots = Object.keys(this.$slots).map((slot) =>
      createElement('template', { slot }, this.$slots[slot])
    )
    return createElement(
      VSwitch,
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
