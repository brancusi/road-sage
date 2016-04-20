import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import Ember from 'ember';
const INCLUDES = [
  'route-visits',
  'route-visits.visit-window',
  'route-visits.visit-window.location',
  'route-visits.visit-window.location.item-desires',
  'route-visits.visit-window.location.item-desires.item',
  'route-visits.visit-window.location.address',
  'route-visits.visit-window.location.visit-windows',
  'route-visits.visit-window.location.company',

  'route-visits.fulfillments',
  'route-visits.fulfillments.route-visit',
  'route-visits.fulfillments.stock',
  'route-visits.fulfillments.stock.stock-levels',
  'route-visits.fulfillments.credit-note',
  'route-visits.fulfillments.credit-note.credit-note-items',
  'route-visits.fulfillments.order',
  'route-visits.fulfillments.order.order-items',
  'route-visits.fulfillments.order.location',
  'route-visits.fulfillments.order.location.address',
  'route-visits.fulfillments.order.location.item-desires',
  'route-visits.fulfillments.order.location.item-desires.item',
  'route-visits.fulfillments.order.location.company',
  'route-visits.fulfillments.order.location.company.price-tier',
  'route-visits.fulfillments.order.location.company.price-tier.item-prices'
  // 'route-visits.orders',
  // 'route-visits.orders.order-items',
  // 'route-visits.orders.order-items.item',
  // 'route-visits.orders.location',
  // 'route-visits.orders.location.company',
  // 'route-visits.orders.location.company.price-tier',
  // 'route-visits.orders.location.company.price-tier.item-prices',
  // 'route-visits.orders.location.company.price-tier.item-prices.item',
  // 'route-visits.orders.location.item-desires',
  // 'route-visits.orders.location.item-desires.location',
  // 'route-visits.orders.location.item-desires.item',
  // 'route-visits.item-levels',
  // 'route-visits.item-levels.item',
  // 'route-visits.item-levels.location',
  // 'route-visits.item-levels.route-visit',
  // 'route-visits.visit-window',
  // 'route-visits.visit-window.location',
  // 'route-visits.visit-window.location.address',
  // 'route-visits.visit-window.location.company'
];

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model(params) {
    return this.store.findRecord('route-plan', params.route_plan_id, {include:INCLUDES.join(','), reload: true});
  },

  actions: {
    didTransition() {
      this.navigator.requestReverse('route-plans.index');

      const model = this.modelFor('route-plans.show');

      this.stateInfo.display({
        label:model.get('formattedDate'),
        info:'Start time: 5:45am'
      });
    }
  }
});
