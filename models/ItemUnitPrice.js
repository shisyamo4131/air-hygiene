/**
 * @author shisyamo4131
 */

export default class ItemUnitPrice {
  constructor(item) {
    this.initialize(item)
    Object.defineProperties(this, {
      key: {
        enumerable: true,
        get() {
          return `${this.collectItemId}-${this.unitId}`
        },
        set(v) {},
      },
    })
  }

  initialize(item) {
    this.collectItemId = item?.collectItemId || ''
    this.unitId = item?.unitId || ''
    this.price = item?.price || null
  }
}
