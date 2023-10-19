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
          return `${this.itemId}-${this.unitId}`
        },
        set(v) {},
      },
    })
  }

  initialize(item) {
    this.itemId = item?.itemId || ''
    this.unitId = item?.unitId || ''
    this.price = item?.price || null
  }
}
