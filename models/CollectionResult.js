/**
 * @author shisyamo4131
 */
import { collection, getDocs, limit, query, where } from 'firebase/firestore'
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
    this.collectionResultDiv = ''
    this.collectItemId = ''
    this.amount = null
    this.unitId = ''
    this.unitPrice = null
    this.convertedWeight = null
    this.remarks = ''
    super.initialize(item)
  }

  async beforeCreate() {
    // ルート回収はitem、unitの重複不可
    if (this.collectionResultDiv === 'root') {
      const duplicatedRootResult = await this.duplicatedRootResult()
      if (duplicatedRootResult) {
        throw new Error(
          `${this.date}の指定された品目、単位でのルート回収実績が既に存在します。`
        )
      }
    }
  }

  async beforeUpdate() {
    // ルート回収はitem、unitの重複不可
    if (this.collectionResultDiv === 'root') {
      const duplicatedRootResult = await this.duplicatedRootResult()
      if (duplicatedRootResult && duplicatedRootResult.docId !== this.docId) {
        throw new Error(
          `${this.date}の指定された品目、単位でのルート回収実績が既に存在します。`
        )
      }
    }
  }

  async duplicatedRootResult() {
    const colRef = collection(this.firestore, this.collection)
    const q = query(
      colRef,
      where('date', '==', this.date),
      where('siteId', '==', this.siteId),
      where('collectItemId', '==', this.collectItemId),
      where('unitId', '==', this.unitId),
      limit(1)
    )
    const snapshot = await getDocs(q)
    if (snapshot.empty) return undefined
    return snapshot.docs[0].data()
  }
}
