/**
 * ### SiteUnitPriceDetail
 *
 * A data model of SiteUnitPriceDetail.
 *
 * #### PROPERTIES
 *
 * | name          | type   | required | remarks                      |
 * | :------------ | :----- | :------: | :--------------------------- |
 * | id            | string | true     | `${collectItemId}-${unitId}` |
 * | collectItemId | string | true     |                              |
 * | unitId        | string | true     |                              |
 * | unitPrice     | number | true     |                              |
 *
 * @author shisyamo4131
 */

export default class SiteUnitPriceDetail {
  constructor(context) {
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
