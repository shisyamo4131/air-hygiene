/**
 * ### Root
 *
 * A data model of Root.
 *
 * #### PROPERTIES
 *
 * | name      | type    | default  | required | remarks                  |
 * | --------- | ------- | -------- | -------- | ------------------------ |
 * | code      | string  | ''       | true     | 3 digits.                |
 * | name      | string  | ''       | true     |                          |
 * | status    | string  | 'active' | true     | [ 'active', 'expired' ]  |
 *
 * @author shisyamo4131
 */
import { doc, getDoc } from 'firebase/firestore'
import FireModel from './FireModel'

const MISSING_CODE = 'CODE is required.'
const DUPLICATE_CODE = 'CODE already used.'

export default class Root extends FireModel {
  constructor(context) {
    super(context.app.$firestore, 'Roots', context.app.$auth)
    this.tokenFields = []
    this.hasMany = [
      {
        collection: 'CollectionResults',
        field: 'rootId',
        condition: '==',
        type: 'collection',
      },
    ]
  }

  initialize(item) {
    this.code = ''
    this.name = ''
    this.status = 'active'
    super.initialize(item)
  }

  async beforeCreate() {
    if (!this.code) throw new Error(MISSING_CODE)
    const docRef = doc(this.firestore, `Roots/${this.code}`)
    const snapshot = await getDoc(docRef)
    if (snapshot.exists()) throw new Error(DUPLICATE_CODE)
  }

  async create() {
    await super.create(this.code)
  }

  async beforeUpdate() {
    if (!this.code) throw new Error(MISSING_CODE)
    const docRef = doc(this.firestore, `Roots/${this.code}`)
    const snapshot = await getDoc(docRef)
    if (snapshot.exists() && snapshot.data().docId !== this.code)
      throw new Error(DUPLICATE_CODE)
  }
}
