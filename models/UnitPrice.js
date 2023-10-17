/**
 * UnitPrice
 * @author shisyamo4131
 */
import FireModel from './FireModel'

export default class UnitPrice extends FireModel {
  constructor(context, docId) {
    const firestore = context.app.$firestore
    const path = `Sites/${docId}/UnitPrices`
    const auth = context.app.$auth
    super(firestore, path, auth)
    Object.defineProperties(this, {
      siteId: {
        enumerable: true,
        get() {
          return this.docId
        },
        set(v) {},
      },
    })
  }

  initialize(item) {
    this.date = ''
    this.prices = []
    // this.itemId = ''
    // this.unitId = ''
    // this.price = null
    super.initialize(item)
  }
}
