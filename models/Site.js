/**
 * Site
 * @create 2023-09-29
 * @author shisyamo4131
 */
import FireModel from './FireModel'

export default class Site extends FireModel {
  constructor(context) {
    super(context.app.$firestore, `Sites`, context.app.$auth)
    this.tokenFields = ['abbr', 'abbrKana']
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
