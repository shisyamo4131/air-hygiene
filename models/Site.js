/**
 * ### Site
 *
 * A data model of Site.
 *
 * #### PROPERTIES
 *
 * | name        | type   | default  | required | remarks                          |
 * | ----------- | ------ | -------- | -------- | -------------------------------- |
 * | code        | string | ''       | true     | 8 digits and auto-numbering.     |
 * | name        | string | ''       | true     |                                  |
 * | abbr        | string | ''       | true     |                                  |
 * | abbrKana    | string | ''       | true     |                                  |
 * | zipcode     | string | ''       | false    |                                  |
 * | address1    | string | ''       | true     |                                  |
 * | address2    | string | ''       | false    |                                  |
 * | tel         | string | ''       | false    |                                  |
 * | fax         | string | ''       | false    |                                  |
 * | url         | string | ''       | false    |                                  |
 * | staffName   | string | ''       | false    |                                  |
 * | staffEmail  | string | ''       | false    |                                  |
 * | status      | string | 'active' | true     | [ 'active', 'expired' ]          |
 * | dateExpired | string | ''       | false    | Required if status is 'expired'. |
 * | remarks     | string | ''       | false    |                                  |
 * | customer    | object | null     | true     | Customer object.                 |
 * | collectDays | array  | []       | true     |                                  |
 *
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
    Object.defineProperties(this, {
      sun: {
        enumerable: true,
        get() {
          return this.collectDays.includes('sun')
        },
        set(v) {},
      },
      mon: {
        enumerable: true,
        get() {
          return this.collectDays.includes('mon')
        },
        set(v) {},
      },
      tue: {
        enumerable: true,
        get() {
          return this.collectDays.includes('tue')
        },
        set(v) {},
      },
      wed: {
        enumerable: true,
        get() {
          return this.collectDays.includes('wed')
        },
        set(v) {},
      },
      thu: {
        enumerable: true,
        get() {
          return this.collectDays.includes('thu')
        },
        set(v) {},
      },
      fri: {
        enumerable: true,
        get() {
          return this.collectDays.includes('fri')
        },
        set(v) {},
      },
      sat: {
        enumerable: true,
        get() {
          return this.collectDays.includes('sat')
        },
        set(v) {},
      },
    })
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
    this.status = 'active'
    this.dateExpired = ''
    this.remarks = ''
    this.customer = null
    this.collectDays = []
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
