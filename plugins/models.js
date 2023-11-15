import Autonumber from '../models/Autonumber'
import CollectItem from '../models/CollectItem'
import Unit from '../models/Unit'
import Customer from '../models/Customer'
import Site from '../models/Site'
import SiteMunicipalContract from '../models/SiteMunicipalContract'
import SiteUnitPrice from '../models/SiteUnitPrice'
import SiteUnitPriceDetail from '../models/SiteUnitPriceDetail'
import Root from '../models/Root'
import RootOrder from '../models/RootOrder'
import CollectionResult from '../models/CollectionResult'
import CollectionResultDetail from '../models/CollectionResultDetail'
import IndustrialPermission from '../models/IndustrialPermission'
import MunicipalPermission from '../models/MunicipalPermission'

export default (context, inject) => {
  inject('Autonumber', () => new Autonumber(context))
  inject('CollectItem', () => new CollectItem(context))
  inject('Unit', () => new Unit(context))
  inject('Customer', () => new Customer(context))
  inject('Site', () => new Site(context))
  inject('SiteUnitPrice', () => new SiteUnitPrice(context))
  inject('SiteUnitPriceDetail', () => new SiteUnitPriceDetail(context))
  inject('SiteMunicipalContract', () => new SiteMunicipalContract(context))
  inject('Root', () => new Root(context))
  inject('RootOrder', () => new RootOrder(context))
  inject('CollectionResult', () => new CollectionResult(context))
  inject('CollectionResultDetail', () => new CollectionResultDetail(context))
  inject('IndustrialPermission', () => new IndustrialPermission(context))
  inject('MunicipalPermission', () => new MunicipalPermission(context))
}
