/**
 * ### Unit
 *
 * A data model of Unit.
 *
 * #### PROPERTIES
 *
 * | name      | type    | default | required | remarks                  |
 * | --------- | ------- | ------- | -------- | ------------------------ |
 * | code      | string  | ''      | true     | 2 digits.                |
 * | name      | string  | ''      | true     |                          |
 * | abbr      | string  | ''      | true     | 4 digits.                |
 * | deletable | boolean | true    | true     | If true, can be deleted. |
 *
 * @author shisyamo4131
 */
import { doc, getDoc } from 'firebase/firestore'
import FireModel from './FireModel'

const MISSING_CODE = 'CODE is required.'
const DUPLICATE_CODE = 'CODE already used.'

export default class Unit extends FireModel {
  constructor(context) {
    super(context.app.$firestore, 'Units', context.app.$auth)
    this.tokenFields = ['abbr', 'abbrKana']
    this.hasMany = [
      {
        collection: 'SiteUnitPrices',
        field: 'unitIds',
        condition: 'array-contains',
        type: 'collection',
      },
      {
        collection: 'CollectionResults',
        field: 'unitIds',
        condition: 'array-contains',
        type: 'collection',
      },
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
    if (!this.code) throw new Error(MISSING_CODE)
    const docRef = doc(this.firestore, `Units/${this.code}`)
    const snapshot = await getDoc(docRef)
    if (snapshot.exists()) throw new Error(DUPLICATE_CODE)
  }

  async create() {
    await super.create(this.code)
  }

  async beforeUpdate() {
    if (!this.code) throw new Error(MISSING_CODE)
    const docRef = doc(this.firestore, `Units/${this.code}`)
    const snapshot = await getDoc(docRef)
    if (snapshot.exists() && snapshot.data().docId !== this.code)
      throw new Error(DUPLICATE_CODE)
  }
}
