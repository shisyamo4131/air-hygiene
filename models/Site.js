/**
 * @author shisyamo4131
 */
import FireModel from './FireModel'

export default class Site extends FireModel {
  constructor(context) {
    super(context.app.$firestore, `Sites`, context.app.$auth)
    this.tokenFields = ['abbr', 'abbrKana']
    this.hasMany = [
      {
        collection: 'CollectionResults',
        field: 'site.docId',
        condition: '==',
        type: 'collection',
      },
    ]
  }

  initialize(item) {
    this.code = ''
    this.name = ''
    this.abbr = ''
    this.abbrKana = ''
    this.zipcode = ''
    this.address1 = ''
    this.address2 = ''
    this.tel = ''
    this.fax = ''
    this.url = ''
    this.staffName = ''
    this.staffEmail = ''
    this.condition = 'active'
    this.remarks = ''
    this.customer = null
    super.initialize(item)
  }
}
