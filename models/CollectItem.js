/**
 * ### CollectItem
 *
 * A data model of CollectItem.
 *
 * #### PROPERTIES
 *
 * | name      | type    | default | required | remarks                                |
 * | --------- | ------- | ------- | -------- | -------------------------------------- |
 * | code      | string  | ''      | true     | 4 digits.                              |
 * | name      | string  | ''      | true     |                                        |
 * | nameKana  | string  | ''      | true     |                                        |
 * | abbr      | string  | ''      | true     | 4 digits.                              |
 * | wasteDiv  | string  | ''      | true     | [ 'municipal', 'industrial', 'other' ] |
 * | remarks   | string  | ''      | false    |                                        |
 * | deletable | boolean | true    | true     | If true, can be deleted.               |
 *
 * @author shisyamo4131
 */
import { doc, getDoc } from 'firebase/firestore'
import FireModel from './FireModel'

const MISSING_CODE = 'CODE is required.'
const DUPLICATE_CODE = 'CODE already used.'

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
    if (!this.code) throw new Error(MISSING_CODE)
    const docRef = doc(this.firestore, `CollectItems/${this.code}`)
    const snapshot = await getDoc(docRef)
    if (snapshot.exists()) throw new Error(DUPLICATE_CODE)
  }

  async create() {
    await super.create(this.code)
  }

  async beforeUpdate() {
    if (!this.code) throw new Error(MISSING_CODE)
    const docRef = doc(this.firestore, `CollectItems/${this.code}`)
    const snapshot = await getDoc(docRef)
    if (snapshot.exists() && snapshot.data().docId !== this.code)
      throw new Error(DUPLICATE_CODE)
  }
}
