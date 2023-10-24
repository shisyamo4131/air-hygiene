/**
 * Unit
 * @create 2023-10-06
 * @author shisyamo4131
 */
import { collection, getDocs, query, where } from 'firebase/firestore'
import FireModel from './FireModel'

export default class Unit extends FireModel {
  constructor(context) {
    super(context.app.$firestore, 'Units', context.app.$auth)
    this.tokenFields = ['abbr', 'abbrKana']
    this.hasMany = [
      {
        collection: 'collectionResults',
        field: 'unit.docId',
        condition: '==',
        type: 'collection',
      },
      // 排出場所の契約単価についても設定が必要になるはず。
    ]
  }

  initialize(item) {
    this.code = ''
    this.name = ''
    this.abbr = ''
    this.deletable = true
    super.initialize(item)
  }

  async beforeCreate() {
    const colRef = collection(this.firestore, 'Units')
    const q = query(colRef, where('code', '==', this.code))
    const snapshot = await getDocs(q)
    if (!snapshot.empty) {
      throw new Error('既に使用されているCODEです。')
    }
  }

  async beforeUpdate() {
    const colRef = collection(this.firestore, 'Units')
    const q = query(colRef, where('code', '==', this.code))
    const snapshot = await getDocs(q)
    if (!snapshot.empty && snapshot.docs[0].data().docId !== this.docId) {
      throw new Error('既に使用されているCODEです。')
    }
  }
}
