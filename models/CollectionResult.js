/**
 * @author shisyamo4131
 */
import FireModel from './FireModel'

export default class Customer extends FireModel {
  constructor(context) {
    super(context.app.$firestore, 'CollectionResult', context.app.$auth)
    this.hasMany = []
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
    })
  }

  initialize(item) {
    this.date = ''
    this.siteId = ''
    this.collectItemId = ''
    this.unitId = ''
    this.unitPrice = null
    this.remarks = ''
    super.initialize(item)
  }
}
