/**
 * SiteUnitPrice
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

  async fetchLatest(date) {
    this.initialize()
    const colRef = collection(this.firestore, this.collection)
    const q = query(
      colRef,
      where('date', '<=', date),
      orderBy('date', 'desc'),
      limit(1)
    )
    const snapshot = await getDocs(q)
    if (snapshot.empty) return
    this.initialize(snapshot.docs[0].data())
  }

  fetchLatestSync(date) {
    this.initialize()
    const colRef = collection(this.firestore, this.collection)
    const q = query(
      colRef,
      where('date', '<=', date),
      orderBy('date', 'desc'),
      limit(1)
    )
    const listener = onSnapshot(q, (snapshot) => {
      this.initialize(snapshot.docs[0].data())
    })
    return listener
  }
}
