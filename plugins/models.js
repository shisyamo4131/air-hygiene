import Autonumber from '../models/Autonumber'
import CollectItem from '../models/CollectItem'
import Unit from '../models/Unit'
import IndustrialPermission from '../models/IndustrialPermission'
import MunicipalPermission from '../models/MunicipalPermission'
import Customer from '../models/Customer'
import Site from '../models/Site'
import SiteMunicipalContract from '../models/SiteMunicipalContract'
import SiteUnitPrice from '../models/SiteUnitPrice'
import SiteUnitPriceDetail from '../models/SiteUnitPriceDetail'
import CollectionResult from '../models/CollectionResult'
import CollectionResultDetail from '../models/CollectionResultDetail'

export default (context, inject) => {
  inject('Autonumber', () => new Autonumber(context))
  inject('IndustrialPermission', () => new IndustrialPermission(context))
  inject('MunicipalPermission', () => new MunicipalPermission(context))
  inject('CollectItem', () => new CollectItem(context))
  inject('Unit', () => new Unit(context))
  inject('Customer', () => new Customer(context))
  inject('Site', () => new Site(context))
  inject('SiteUnitPrice', (siteId) => new SiteUnitPrice(context, siteId))
  inject('SiteUnitPriceDetail', () => new SiteUnitPriceDetail(context))
  inject('CollectionResult', () => new CollectionResult(context))
  inject('CollectionResultDetail', () => new CollectionResultDetail(context))
  inject(
    'SiteMunicipalContract',
    (docId) => new SiteMunicipalContract(context, docId)
  )
}
