/**
 * ### SiteUnitPrice
 *
 * A data model of SiteUnitPrice.
 *
 * #### PROPERTIES
 *
 * | name    | type   | default | required | remarks |
 * | :------ | :----- | ------- | :------: | :------ |
 * | siteId  | string | ''      | true     |         |
 * | date    | string | ''      | true     |         |
 * | details | array  | []      | true     |         |
 *
 * #### PROPERTIES(readonly)
 *
 * | name           | type  | default | required | remarks                      |
 * | :------------- | :---- | ------- | :------: | :--------------------------- |
 * | collectItemIds | array | []      | true     | Document ids of CollectItem. |
 * | unitIds        | array | []      | true     | Document ids of Unit.        |
 * | details        | array | []      | true     |                              |
 *
 * @author shisyamo4131
 */

import {
  collection,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore'
import FireModel from './FireModel'

export default class SiteUnitPrice extends FireModel {
  constructor(context) {
    const firestore = context.app.$firestore
    const auth = context.app.$auth
    super(firestore, 'SiteUnitPrices', auth)
    Object.defineProperties(this, {
      collectItemIds: {
        enumerable: true,
        get() {
          return this.details.map(({ collectItemId }) => collectItemId)
        },
        set(v) {},
      },
      unitIds: {
        enumerable: true,
        get() {
          return this.details.map(({ unitId }) => unitId)
        },
        set(v) {},
      },
    })
  }

  initialize(item) {
    this.siteId = ''
    this.date = ''
    this.details = []
    super.initialize(item)
  }

  async fetchLatest(siteId, date) {
    this.initialize()
    const colRef = collection(this.firestore, this.collection)
    const q = query(
      colRef,
      where('siteId', '==', siteId),
      where('date', '<=', date),
      orderBy('date', 'desc'),
      limit(1)
    )
    const snapshot = await getDocs(q)
    if (snapshot.empty) return
    this.initialize(snapshot.docs[0].data())
  }

  fetchLatestSync(siteId, date) {
    this.initialize()
    const colRef = collection(this.firestore, this.collection)
    const q = query(
      colRef,
      where('siteId', '==', siteId),
      where('date', '<=', date),
      orderBy('date', 'desc'),
      limit(1)
    )
    const listener = onSnapshot(q, (snapshot) => {
      if (snapshot.empty) return
      this.initialize(snapshot.docs[0].data())
    })
    return listener
  }

  async fetchUnitPrice(siteId, date, id) {
    try {
      await this.fetchLatest(siteId, date)
      if (!this.docId) return undefined
      const result = this.details.find((detail) => detail.id === id)
      return result?.unitPrice || undefined
    } catch (err) {
      // eslint-disable-next-line
      console.error(err)
      throw err
    }
  }
}
