/**
 * ### CollectionResultDetail
 *
 * A data-model of CollectionResultDetail.
 *
 * #### CONSTRUCTOR
 *
 * | name     | type    | remarks       |
 * | :---     | :---    | :---          |
 * | context  | object  | nuxt.context  |
 * | siteId   | string  |               |
 * | date     | string  |               |
 *
 * #### PROPERTIES
 *
 * | name           | type    | required | remarks                     |
 * | :---           | :---    | :---:    | :---                        |
 * | key            | string  | -        | ${collectItemId}-${unitId}  |
 * | collectItemId  | string  | true     |                             |
 * | unitId         | string  | true     |                             |
 * | amount         | number  | true     |                             |
 * | unitPrice      | number  | true     |                             |
 * | price          | number  | true     | amount * unitPrice          |
 *
 * @author shisyamo4131
 */

export default class CollectionResultDetail {
  #context
  constructor(context, siteId, date) {
    this.#context = context
    this.siteId = siteId
    this.date = date
    this.initialize()
    Object.defineProperties(this, {
      id: {
        enumerable: true,
        get() {
          return `${this.collectItemId}-${this.unitId}`
        },
        set(v) {},
      },
      price: {
        enumerable: true,
        get() {
          const amount = this.amount * 100
          const unitPrice = this.unitPrice * 100
          return (amount * unitPrice) / 10000
        },
        set(v) {},
      },
      collectItem: {
        enumerable: false,
        get() {
          if (!this.collectItemId) return undefined
          const store = this.#context.store
          const result = store.getters['masters/CollectItem'](
            this.collectItemId
          )
          return result
        },
        set(v) {},
      },
      unit: {
        enumerable: false,
        get() {
          if (!this.unitId) return undefined
          const store = this.#context.store
          const result = store.getters['masters/Unit'](this.unitId)
          return result
        },
        set(v) {},
      },
    })
  }

  initialize(item) {
    this.collectItemId = ''
    this.unitId = ''
    this.amount = null
    this.unitPrice = null
    if (!item) return
    Object.keys(item).forEach((key) => {
      if (key in this) this[key] = item[key]
    })
  }

  /**
   * Get unit-price and set it to 'unitPrice'.
   * Return true if unit-price was gotten.
   * Return false if unit-price was not gotten.
   * @returns boolean
   */
  async setUnitPrice() {
    /* eslint-disable */
    // Return false if siteId or date is missing.
    if (!this.siteId || !this.date) {
      console.warn(`[CollectionResult.js] The siteId or date is missing.`)
      console.table({ siteId: this.siteId, date: this.date })
      return false
    }
    // Return false if collectItem or unit is missing.
    if (!this.collectItem || !this.unit) {
      console.warn(
        `[CollectionResult.js] The collectItem or unit could not be identified.`
      )
      console.table({ collectItemId: this.collectItemId, unitId: this.unitId })
      return false
    }
    // Get price from SiteUnitPrice model and set it to unitPrice property.
    const app = this.#context.app
    const siteUnitPriceModel = app.$SiteUnitPrice(this.siteId)
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
