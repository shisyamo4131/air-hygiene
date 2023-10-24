/**
 * ### Customer
 * @author shisyamo4131
 */
import FireModel from './FireModel'

export default class Customer extends FireModel {
  constructor(context) {
    super(context.app.$firestore, 'Customers', context.app.$auth)
    this.hasMany = [
      {
        collection: 'Sites',
        field: 'customer.docId',
        condition: '==',
        type: 'collection',
      },
    ]
    this.tokenFields = ['abbr', 'abbrKana']
  }

  initialize(item) {
    this.code = ''
    this.name1 = ''
    this.name2 = ''
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
    this.honor = '御中'
    this.deadline = '99'
    this.depositMonth = 1
    this.depositDay = '99'
    this.rounding = 'round'
    this.condition = 'active'
    this.dateExpired = ''
    this.remarks = ''
    super.initialize(item)
  }
}
