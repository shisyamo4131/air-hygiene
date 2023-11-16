/**
 * ### Customer
 *
 * A data model of Customer.
 *
 * #### PROPERTIES
 *
 * | name         | type   | default  | required | remarks                                |
 * | ------------ | ------ | -------- | -------- | -------------------------------------- |
 * | code         | string | ''       | true     | 5 digits and auto-numbering.           |
 * | name1        | string | ''       | true     |                                        |
 * | name2        | string | ''       | false    |                                        |
 * | abbr         | string | ''       | true     |                                        |
 * | abbrKana     | string | ''       | true     |                                        |
 * | zipcode      | string | ''       | false    |                                        |
 * | address1     | string | ''       | true     |                                        |
 * | address2     | string | ''       | false    |                                        |
 * | tel          | string | ''       | false    |                                        |
 * | fax          | string | ''       | false    |                                        |
 * | url          | string | ''       | false    |                                        |
 * | staffName    | string | ''       | false    |                                        |
 * | staffEmail   | string | ''       | false    |                                        |
 * | honor        | string | '御中'   | true     |                                        |
 * | deadline     | string | '99'     | true     | [ '05', '10', '15', '20', '25', '99' ] |
 * | depositMonth | number | 1        | true     |                                        |
 * | depositDay   | string | '99'     | true     | [ '05', '10', '15', '20', '25', '99' ] |
 * | rounding     | string | 'round'  | true     | [ 'floor', 'round', 'ceil' ]           |
 * | status       | string | 'active' | true     | [ 'active', 'expired' ]                |
 * | dateExpired  | string | ''       | false    | Required if status is 'expired'.       |
 * | remarks      | string | ''       | false    |                                        |
 *
 * @author shisyamo4131
 */
import FireModel from './FireModel'

export default class Customer extends FireModel {
  constructor(context) {
    super(context.app.$firestore, 'Customers', context.app.$auth)
    this.hasMany = [
      {
        collection: 'Sites',
        field: 'customerId',
        condition: '==',
        type: 'collection',
      },
    ]
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
    this.status = 'active'
    this.dateExpired = ''
    this.remarks = ''
    super.initialize(item)
  }

  beforeCreate() {
    return new Promise((resolve) => {
      if (!this.status === 'active') this.dateExpired = ''
      resolve()
    })
  }

  beforeUpdate() {
    return new Promise((resolve) => {
      if (!this.status === 'active') this.dateExpired = ''
      resolve()
    })
  }
}
