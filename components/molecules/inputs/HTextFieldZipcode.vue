<script>
/**
 * @create 2023-09-25
 * @author shisyamo4131
 */
import adapter from 'axios-jsonp'
import ATextField from '~/components/atoms/inputs/ATextField.vue'
export default {
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: { ATextField },
  /******************************************************************
   * PROPS
   ******************************************************************/
  props: {
    value: { type: String, default: undefined, required: false },
  },
  /******************************************************************
   * DATA
   ******************************************************************/
  data() {
    return {
      isLoading: false,
    }
  },
  /******************************************************************
   * COMPUTED
   ******************************************************************/
  computed: {
    icon() {
      return this.isLoading ? 'mdi-loading mdi-spin' : 'mdi-download'
    },
    listeners() {
      return {
        ...this.$listeners,
        'click:append-outer': () => this.onClickAppendOuter(),
        input: (e) => this.$emit('input', e),
      }
    },
  },
  /******************************************************************
   * METHODS
   ******************************************************************/
  methods: {
    async onClickAppendOuter() {
      if (!this.value || this.value.length !== 7) return
      if (this.isLoading) return
      try {
        this.isLoading = true
        const result = await this.fetch(this.value)
        const pref = result.address1
        const city = result.address2
        const addr = result.address3
        const prefCode = result.prefcode
        const full = result.address1 + result.address2 + result.address3
        this.$emit('loaded', { pref, city, addr, prefCode, full })
      } catch (err) {
        // eslint-disable-next-line
        console.error(err)
        alert(err.message)
      } finally {
        this.isLoading = false
      }
    },
    async fetch(zipcode) {
      const uri = 'https://zipcloud.ibsnet.co.jp/api/search'
      const params = { zipcode }
      const res = await this.$axios.$get(uri, { adapter, params })
      if (res.status !== 200) throw new Error(res.message)
      if (!res.results) throw new Error('該当する住所がありませんでした。')
      const result = Array.isArray(res.results) ? res.results[0] : res.results
      /* eslint-disable */
      console.info(`住所の取得に成功しました。`)
      console.table(result)
      /* eslint-enable */
      return result
    },
  },
  /******************************************************************
   * RENDER
   ******************************************************************/
  render(createElement) {
    const slots = Object.keys(this.$slots).map((slot) =>
      createElement('template', { slot }, this.$slots[slot])
    )
    return createElement(
      ATextField,
      {
        attrs: {
          inputType: 'zipcode',
          appendOuterIcon: this.icon,
          value: this.value,
          ...this.$attrs,
        },
        on: this.listeners,
        scopedSlots: this.$scopedSlots,
      },
      slots
    )
  },
}
</script>

<style></style>
