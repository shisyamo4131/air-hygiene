/**
 * SiteUnitPrice
 * @author shisyamo4131
 */
import FireModel from './FireModel'

export default class SiteUnitPrice extends FireModel {
  constructor(context, docId) {
    if (!docId) throw new Error('Missing docId.')
    const firestore = context.app.$firestore
    const path = `Sites/${docId}/SiteUnitPrices`
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
    super.initialize(item)
  }
}
