/**
 * @author shisyamo4131
 */
import FireModel from './FireModel'

export default class Customer extends FireModel {
  constructor(context) {
    super(context.app.$firestore, 'CollectionResults', context.app.$auth)
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
    this.siteId = ''
    this.collectItemId = ''
    this.amount = null
    this.unitId = ''
    this.unitPrice = null
    this.convertedWeight = null
    this.remarks = ''
    super.initialize(item)
  }
}
