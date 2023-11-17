/**
 * ### RootOrder
 *
 * A data model of RootOrder.
 *
 * #### PROPERTIES
 *
 * | name    | type   | default | required | remarks |
 * | :------ | :----- | ------- | :------: | :------ |
 * | rootId  | string | ''      | true     |         |
 * | date    | string | ''      | true     |         |
 * | sun     | array  | []      | true     |         |
 * | mon     | array  | []      | true     |         |
 * | tue     | array  | []      | true     |         |
 * | wed     | array  | []      | true     |         |
 * | thu     | array  | []      | true     |         |
 * | fri     | array  | []      | true     |         |
 * | sat     | array  | []      | true     |         |
 *
 * #### PROPERTIES(readonly)
 *
 * | name           | type  | default | required | remarks                      |
 * | :------------- | :---- | ------- | :------: | :--------------------------- |
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

export default class RootOrder extends FireModel {
  constructor(context) {
    const firestore = context.app.$firestore
    const auth = context.app.$auth
    super(firestore, 'RootOrders', auth)
  }

  initialize(item) {
    this.rootId = ''
    this.date = ''
    this.sun = []
    this.mon = []
    this.tue = []
    this.wed = []
    this.thu = []
    this.fri = []
    this.sat = []
    super.initialize(item)
  }

  async fetchLatest(rootId, date) {
    this.initialize()
    const colRef = collection(this.firestore, this.collection)
    const q = query(
      colRef,
      where('rootId', '==', rootId),
      where('date', '<=', date),
      orderBy('date', 'desc'),
      limit(1)
    )
    const snapshot = await getDocs(q)
    if (snapshot.empty) return
    this.initialize(snapshot.docs[0].data())
  }

  fetchLatestSync(rootId, date) {
    this.initialize()
    const colRef = collection(this.firestore, this.collection)
    const q = query(
      colRef,
      where('rootId', '==', rootId),
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
}
