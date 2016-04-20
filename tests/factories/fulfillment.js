import FactoryGuy from 'ember-data-factory-guy';

FactoryGuy.define('fulfillment', {
  default: {
    routeVisit: FactoryGuy.belongsTo('route-visit'),
    order: FactoryGuy.belongsTo('order')
  }
});
