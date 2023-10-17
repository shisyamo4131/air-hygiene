/**
 * Items
 * @create 2023-10-03
 * @author shisyamo4131
 */
import { collection, getDocs, query, where } from 'firebase/firestore'
import FireModel from './FireModel'

export default class Item extends FireModel {
  constructor(context, docId) {
    super(context.app.$firestore, `Items`, context.app.$auth)
    this.tokenFields = ['name', 'nameKana', 'abbr']
    this.hasMany = [
      { collection: 'collectionResults', field: 'item.docId', condition: '==' },
      // 排出場所の契約単価についても設定が必要になるはず。
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
    const colRef = collection(this.firestore, 'Items')
    const q = query(colRef, where('code', '==', this.code))
    const snapshot = await getDocs(q)
    if (!snapshot.empty) {
      throw new Error('既に使用されているCODEです。')
    }
  }

  async beforeUpdate() {
    const colRef = collection(this.firestore, 'Items')
    const q = query(colRef, where('code', '==', this.code))
    const snapshot = await getDocs(q)
    if (!snapshot.empty && snapshot.docs[0].data().docId !== this.docId) {
      throw new Error('既に使用されているCODEです。')
    }
  }
}
