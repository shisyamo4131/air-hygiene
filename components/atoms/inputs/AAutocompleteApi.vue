<script>
/**
 * AAutocompleteApi
 *
 * Firestoreの脆弱な検索機能を補うため、Airプロジェクトで使用するFireModelは
 * tokenMapをドキュメントに含める機能を実装しています。
 * このtokenMapを利用した非同期通信を行うことができるAutocompleteコンポーネントです。
 *
 * itemsプロパティの並べ替え（sort）機能は実装していません。
 * 1. ある程度少数になるまで絞り込みが行われることが前提であるため。
 * 2. VAutocompleteのcache-itemsの機能により正常に並べ替えができないため。
 *
 * @create 2023-09-27
 * @author shisyamo4131
 */
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore'
import AAutocomplete from '~/components/atoms/inputs/AAutocomplete.vue'
export default {
  /***************************************************************************
   * COMPONENTS
   ***************************************************************************/
  components: { AAutocomplete },
  /***************************************************************************
   * PROPS
   ***************************************************************************/
  props: {
    collection: { type: String, required: true },
    field: { type: String, default: 'tokenMap', required: false },
    itemValue: { type: String, default: 'docId', required: false },
    multiple: { type: Boolean, default: false, required: false },
    value: {
      type: [String, Array, Object],
      default: undefined,
      required: false,
    },
  },
  /***************************************************************************
   * DATA
   ***************************************************************************/
  data() {
    return {
      isSearching: false,
      items: [],
      search: null,
      timerId: undefined,
    }
  },
  /***************************************************************************
   * COMPUTED
   ***************************************************************************/
  computed: {
    /* うまく並べ替えができないためコメントアウト */
    // sortedItems() {
    //   if (!this.items.length) return []
    //   const result = this.items.map((item) => item)
    //   if (!this.sort || !this.sort.length) return result
    //   const sortItems = Array.isArray(this.sort) ? this.sort : [this.sort]
    //   sortItems.forEach((sortItem, index) => {
    //     result.sort((a, b) => {
    //       if (a[sortItem] < b[sortItem]) return -1
    //       if (a[sortItem] > b[sortItem]) return 1
    //       return 0
    //     })
    //   })
    //   return result
    // },
  },
  /***************************************************************************
   * WATCH
   ***************************************************************************/
  watch: {
    /**
     * data.searchの値が変更される都度、fetchData()を呼び出してデータ取得を試みます。
     * 連続した入力の最中はデータ取得を行わないように、0.5秒のデバウンスを持ちます。
     *
     * ##### NOTE
     * a-autocompleteはmultipleが設定されていない場合、既に読み込まれたデータ（items）から
     * itemが選択されるとsearcm-inputが一度初期化され、直後に選択されたitemの値に更新されます。
     * ※itemがobjectの場合、itemTextで指定されたプロパティ値に更新されます。
     * この動きにより、itemsからitemを選択した直後に再度、データの取得処理が実行されてしまいます。
     * 様々なケースに対応しなければならないため、この回避を行っていません。
     * multipleが設定されている場合は、itemsからitemを選択した直後、searcm-inputは
     * 空文字列になります。
     * => 日本語入力の場合、入力した値の変換前（確定前）にitemを選択した場合に、
     *    入力した値が残ってしまうため、v-autocompleteの既定動作を上書きしています。
     * よって、searchの値が空であるためitem選択直後のデータ取得は行われません。
     */
    search(v) {
      this.isSearching = false
      clearTimeout(this.timerId)
      if (!v) return
      this.isSearching = true
      this.timerId = setTimeout(() => {
        this.fetchData()
      }, 500)
    },
    value: {
      handler(v) {
        try {
          this.isSearching = true
          if (!v || (Array.isArray(v) && v.length === 0)) return
          const values = Array.isArray(v) ? v : [v]
          values.forEach((item) => {
            if (!this.isLoaded(item)) {
              const docId =
                typeof item === 'string' ? item : item[this.itemValue]
              const docRef = doc(this.$firestore, this.collection, docId)
              getDoc(docRef).then((docSnap) => {
                this.items.push({ ...docSnap.data() })
              })
            }
          })
        } catch (err) {
          // eslint-disable-next-line
          console.error(err)
          alert(err.message)
        } finally {
          this.isSearching = false
        }
      },
      deep: true,
      immediate: true,
    },
  },
  /***************************************************************************
   * METHODS
   ***************************************************************************/
  methods: {
    isLoaded(item) {
      const v = typeof item === 'string' ? item : item[this.itemValue]
      if (!this.items.length) return false
      if (typeof this.items[0] === 'string') {
        return this.items.includes(v)
      } else {
        return this.items.some((item) => item[this.itemValue] === v)
      }
    },
    async fetchData() {
      try {
        const fetchResult = await this.fetchNgramSync()
        fetchResult.forEach((result) => {
          const index = this.items.findIndex(
            ({ docId }) => docId === result.docId
          )
          if (index === -1) this.items.push(result)
          if (index !== -1) this.items.splice(index, 1, result)
        })
      } catch (err) {
        // eslint-disable-next-line
        console.error(err)
        alert(err.message)
      } finally {
        this.isSearching = false
      }
    },
    async fetchNgramSync() {
      /* eslint-disable */
      // Early return if search is not specified.
      if (!this.search) return []
      // Create where statements from search string.
      const searchLength = this.search.length === 1 ? 1 : 2
      const searchItems = []
      for (let i = 0; i <= this.search.length - searchLength; i++) {
        searchItems.push(this.search.substring(i, i + searchLength))
      }
      const wheres = searchItems.map((item) => {
        return where(`${this.field}.${item}`, '==', true)
      })
      // Query.
      const q = query(collection(this.$firestore, this.collection), ...wheres)
      const snapshot = await getDocs(q)
      console.info(
        `[AutocompleteApi] Fetched ${snapshot.docs.length} documents.`
      )
      // Returns empty array if snapshot is empty.
      if (snapshot.empty) return []
      // Returns fetch results as array.
      console.table(snapshot.docs.map((doc) => doc.data()))
      return snapshot.docs.map((doc) => doc.data())
      /* eslint-enable */
    },
  },
}
</script>

<template>
  <a-autocomplete
    v-bind="$attrs"
    cache-items
    hide-no-data
    :items="items"
    item-value="docId"
    :loading="isSearching"
    :multiple="multiple"
    :searcm-input.sync="search"
    :value="value"
    v-on="$listeners"
  >
    <template #progress>
      <v-progress-linear
        indeterminate
        color="info"
        absolute
      ></v-progress-linear>
    </template>
    <template
      v-for="(_, scopedSlotName) in $scopedSlots"
      #[scopedSlotName]="slotData"
    >
      <slot :name="scopedSlotName" v-bind="slotData" />
    </template>
    <template v-for="(_, slotName) in $slots" #[slotName]>
      <slot :name="slotName" />
    </template>
  </a-autocomplete>
</template>

<style></style>
