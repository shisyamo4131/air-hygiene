/**
 * ### SiteUnitPriceDetail
 *
 * A data-model of SiteUnitPriceDetail.
 *
 * #### CONSTRUCTOR
 *
 * | name     | type    | remarks       |
 * | :---     | :---    | :---          |
 * | context  | object  | nuxt.context  |
 *
 * #### PROPERTIES (read and write)
 *
 * | name           | type    | required | remarks  |
 * | :---           | :---    | :---:    | :---     |
 * | collectItemId  | string  | true     |          |
 * | unitId         | string  | true     |          |
 * | unitPrice      | number  | true     |          |
 *
 * #### PROPERTIES (read-only)
 *
 * | name           | type    | remarks                     |
 * | :---           | :---    | :---                        |
 * | id             | string  | ${collectItemId}-${unitId}  |
 *
 * @author shisyamo4131
 */

export default class SiteUnitPriceDetail {
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
    })
  }

  initialize(item) {
    this.collectItemId = ''
    this.unitId = ''
    this.unitPrice = null
    if (!item) return
    Object.keys(item).forEach((key) => {
      if (key in this) this[key] = item[key]
    })
  }
}
