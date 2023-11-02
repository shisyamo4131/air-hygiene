/**
 * ### CollectionResult
 *
 * A data-model of CollectionResult.
 *
 * #### PROPERTIES
 *
 * | name             | type   | default | required | remarks                           |
 * | :--------------- | :----- | ------- | :------: | :-------------------------------- |
 * | date             | string | ''      | true     |                                   |
 * | site             | object | null    | true     |                                   |
 * | resultType       | string | ''      | true     | [ 'root', 'spot' ]                |
 * | rootId           | string | ''      | *        | Required if resultType is 'root'. |
 * | details          | array  | []      | true     |                                   |
 * | municipalWeight  | number | null    | true     |                                   |
 * | industrialWeight | number | null    | true     |                                   |
 * | dateDeadline     | string | ''      | true     |                                   |
 * | remarks          | string |         | false    |                                   |
 *
 * #### PROPERTIES (read-only)
 *
 * | name           | type   | remarks                                |
 * | :------------- | :----- | :------------------------------------- |
 * | year           | string | year of date.                          |
 * | month          | string | month of date.                         |
 * | yearMonth      | string | YYYY-MM of date.                       |
 * | sales          | number | Total price of details                 |
 * | collectItemIds | array  | An array of docId included in details. |
 * | unitIds        | array  | An array of docId included in details. |
 *
 * @author shisyamo4131
 */
import { collection, getDocs, limit, query, where } from 'firebase/firestore'
import FireModel from './FireModel'

export default class CollectionResult extends FireModel {
  #context
  constructor(context) {
    super(context.app.$firestore, 'CollectionResults', context.app.$auth)
    this.#context = context
    this.tokenFields = []
    Object.defineProperties(this, {
      year: {
        enumerable: true,
        get() {
          if (!this.date) return
          return this.date.substr(0, 4)
        },
        set(v) {},
      },
      month: {
        enumerable: true,
        get() {
          if (!this.date) return
          return this.date.substr(5, 2)
        },
        set(v) {},
      },
      yearMonth: {
        enumerable: true,
        get() {
          if (!this.date) return
          return this.date.substr(0, 7)
        },
        set(v) {},
      },
      sales: {
        enumerable: true,
        get() {
          const result = this.details.reduce((sum, item) => {
            sum = sum + item.price
            return sum
          }, 0)
          return result
        },
        set(v) {},
      },
      collectItemIds: {
        enumerable: true,
        get() {
          return this.details.map(({ collectItemId }) => collectItemId)
        },
        set(v) {},
      },
      unitIds: {
        enumerable: true,
        get() {
          return this.details.map(({ unitId }) => unitId)
        },
        set(v) {},
      },
    })
  }

  initialize(item) {
    this.date = ''
    this.site = null
    this.resultType = ''
    this.rootId = ''
    this.details = []
    this.municipalWeight = null
    this.industrialWeight = null
    this.dateDeadline = ''
    this.remarks = ''
    super.initialize(item)
  }

  async beforeCreate() {
    // ルート回収は同一日・同一ルートの重複不可
    if (this.resultType === 'root') {
      const getDuplicatedRootResult = await this.getDuplicatedRootResult()
      if (getDuplicatedRootResult) {
        throw new Error(`${this.date}のルート回収実績が既に存在します。`)
      }
    }
    // ルート回収でなければルートidは初期化
    if (this.resultType !== 'root') this.rootId = ''
  }

  async beforeUpdate() {
    // ルート回収は同一日・同一ルートの重複不可
    if (this.resultType === 'root') {
      const getDuplicatedRootResult = await this.getDuplicatedRootResult()
      if (
        getDuplicatedRootResult &&
        getDuplicatedRootResult.docId !== this.docId
      ) {
        throw new Error(`${this.date}のルート回収実績が既に存在します。`)
      }
    }
    // ルート回収でなければルートidは初期化
    if (this.resultType !== 'root') this.rootId = ''
  }

  async getDuplicatedRootResult() {
    const colRef = collection(this.firestore, this.collection)
    const q = query(
      colRef,
      where('date', '==', this.date),
      where('site.docId', '==', this.site.docId),
      where('resultType', '==', 'root'),
      where('rootId', '==', this.rootId),
      limit(1)
    )
    const snapshot = await getDocs(q)
    if (snapshot.empty) return undefined
    return snapshot.docs[0].data()
  }

  /**
   * Calculate date of deadline and set it to 'dateDeadline'.
   * @returns
   */
  setDateDeadline() {
    /* eslint-disable */
    // Ensure that date and site properties are set.
    if (!this.date || !this.site) {
      console.warn(
        `[CollectionResult.js] The date or site property is not set.`
      )
      console.table({ date: this.date, site: this.site })
      return
    }
    // Set.
    const deadline = this.site.customer.deadline
    const app = this.#context.app
    this.dateDeadline = app.$airCalcDeadlineDate(this.date, deadline)
    /* eslint-enable */
  }
}
