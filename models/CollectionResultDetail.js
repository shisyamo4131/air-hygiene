/**
 * ### CollectionResultDetail
 *
 * A data-model of CollectionResultDetail.
 *
 * #### PROPERTIES
 *
 * | name          | type   | default | required | remarks |
 * | :------------ | :----- | ------- | :------: | :------ |
 * | collectItemId | string | ''      | true     |         |
 * | unitId        | string | ''      | true     |         |
 * | amount        | number | null    | true     |         |
 * | unitPrice     | number | null    | true     |         |
 *
 * #### PROPERTIES (read-only)
 *
 * | name  | type   | default | required | remarks                      |
 * | :---- | :----- | ------- | :------: | :--------------------------- |
 * | id    | string | ''      | true     | `${collectItemId}-${unitId}` |
 * | price | number | 0       | true     | amount * unitPrice           |
 *
 * @author shisyamo4131
 */

export default class CollectionResultDetail {
  #context
  constructor(context) {
    this.#context = context
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
  async setUnitPrice(siteId, date) {
    /* eslint-disable */
    // Return false if siteId or date is missing.
    if (!siteId || !date) {
      console.warn(`[CollectionResultDetail.js] The siteId or date is missing.`)
      console.table({ siteId, date })
      return false
    }
    // Return false if collectItem or unit is missing.
    if (!this.collectItemId || !this.unitId) {
      console.warn(
        `[CollectionResultDetail.js] The collectItem or unit could not be identified.`
      )
      console.table({ collectItemId: this.collectItemId, unitId: this.unitId })
      return false
    }
    // Get price from SiteUnitPrice model and set it to unitPrice property.
    const app = this.#context.app
    const siteUnitPrice = app.$SiteUnitPrice()
    const id = `${this.collectItemId}-${this.unitId}`
    try {
      const fetchedUnitPrice = await siteUnitPrice.fetchUnitPrice(
        siteId,
        date,
        id
      )
      this.unitPrice = fetchedUnitPrice || null
      if (!fetchedUnitPrice && fetchedUnitPrice !== 0) return false
      return true
    } catch (err) {
      console.error(err)
      alert(err.message)
    }
    /* eslint-enable */
  }
}
