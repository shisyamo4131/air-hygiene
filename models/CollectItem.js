/**
 * @author shisyamo4131
 */
import { collection, getDocs, query, where } from 'firebase/firestore'
import FireModel from './FireModel'

export default class CollectItem extends FireModel {
  constructor(context) {
    super(context.app.$firestore, `CollectItems`, context.app.$auth)
    this.tokenFields = ['name', 'nameKana', 'abbr']
    this.hasMany = [
      {
        collection: 'SiteUnitPrices',
        field: 'collectItemIds',
        condition: 'array-contains',
        type: 'subcollection',
      },
      {
        collection: 'CollectionResults',
        field: 'collectItemIds',
        condition: 'array-contains',
        type: 'collection',
      },
    ]
  }

  initialize(item) {
    this.code = ''
    this.name = ''
    this.nameKana = ''
    this.abbr = ''
    this.wasteDiv = ''
    this.remarks = ''
    this.deletable = true
    super.initialize(item)
  }

  async beforeCreate() {
    const colRef = collection(this.firestore, 'CollectItems')
    const q = query(colRef, where('code', '==', this.code))
    const snapshot = await getDocs(q)
    if (!snapshot.empty) {
      throw new Error('既に使用されているCODEです。')
    }
  }

  // async create() {
  //   if (!this.code) throw new Error('CODEが必要です。')
  //   await super.create(this.code)
  // }

  async beforeUpdate() {
    const colRef = collection(this.firestore, 'CollectItems')
    const q = query(colRef, where('code', '==', this.code))
    const snapshot = await getDocs(q)
    if (!snapshot.empty && snapshot.docs[0].data().docId !== this.docId) {
      throw new Error('既に使用されているCODEです。')
    }
  }
}
