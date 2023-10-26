/**
 * @author shisyamo4131
 */
import { collection, getDocs, limit, query, where } from 'firebase/firestore'
import FireModel from './FireModel'

export default class Customer extends FireModel {
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
          if (!this.amount || !this.unitPrice) return 0
          const amount = this.amount * 100
          const unitPrice = this.unitPrice * 100
          return (amount * unitPrice) / 10000
        },
        set(v) {},
      },
    })
  }

  initialize(item) {
    this.date = ''
    this.site = null
    this.collectionResultDiv = ''
    this.collectItemId = ''
    this.amount = null
    this.unitId = ''
    this.unitPrice = null
    this.convertedWeight = null
    this.dateDeadline = ''
    this.remarks = ''
    super.initialize(item)
  }

  async beforeCreate() {
    // ルート回収はitem、unitの重複不可
    if (this.collectionResultDiv === 'root') {
      const getDuplicatedRootResult = await this.getDuplicatedRootResult()
      if (getDuplicatedRootResult) {
        throw new Error(
          `${this.date}の指定された品目、単位でのルート回収実績が既に存在します。`
        )
      }
    }
  }

  async beforeUpdate() {
    // ルート回収はitem、unitの重複不可
    if (this.collectionResultDiv === 'root') {
      const getDuplicatedRootResult = await this.getDuplicatedRootResult()
      if (
        getDuplicatedRootResult &&
        getDuplicatedRootResult.docId !== this.docId
      ) {
        throw new Error(
          `${this.date}の指定された品目、単位でのルート回収実績が既に存在します。`
        )
      }
    }
  }

  async getDuplicatedRootResult() {
    const colRef = collection(this.firestore, this.collection)
    const q = query(
      colRef,
      where('date', '==', this.date),
      where('site.docId', '==', this.site.docId),
      where('collectItemId', '==', this.collectItemId),
      where('unitId', '==', this.unitId),
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

  /**
   * Get unit-price and set it to 'unitPrice'.
   * @returns boolean
   */
  async setUnitPrice() {
    /* eslint-disable */
    // Ignore if collectionResultDiv is not 'root'.
    if (this.collectionResultDiv !== 'root') {
      console.warn(
        `[CollectionResult.js] Ignore cause collectionResultDiv is not 'root'.`
      )
      return false
    }
    // Ensure that date and site properties are set.
    if (!this.date || !this.site) {
      console.warn(
        `[CollectionResult.js] The date or site property is not set.`
      )
      console.table({ date: this.date, site: this.site })
      return false
    }
    // Ensure that collectItemId and unitId properties are set.
    if (!this.collectItemId || !this.unitId) {
      console.warn(
        `[CollectionResult.js] A collectItemId and unitId are required to set the unitPrice.`
      )
      console.table({ collectItemId: this.collectItemId, unitId: this.unitId })
      return false
    }
    // Get CollectItem from Vuex.
    const store = this.#context.store
    const collectItem = store.getters['masters/CollectItem'](this.collectItemId)
    // Return if CollectItem is missing.
    if (!collectItem) {
      console.warn(
        `[CollectionResult.js] The specified collection item ID does not exist.`
      )
      console.table({ collectItemId: this.collectItemId })
      return false
    }
    // Get price from SiteUnitPrice model and set it to unitPrice property.
    const app = this.#context.app
    const siteUnitPriceModel = app.$SiteUnitPrice(this.site.docId)
    const key = `${this.collectItemId}-${this.unitId}`
    try {
      const fetchedPrice = await siteUnitPriceModel.fetchUnitPrice(
        this.date,
        key
      )
      this.unitPrice = fetchedPrice
      if (!fetchedPrice && fetchedPrice !== 0) return false
      return true
    } catch (err) {
      console.error(err)
      alert(err.message)
    }
    /* eslint-enable */
  }
}
