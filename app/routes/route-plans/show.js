import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import Ember from 'ember';
const INCLUDES = [
  'route-visits',
  'route-visits.route-plan',
  'route-visits.visit-window',
  'route-visits.visit-window.location',
  'route-visits.visit-window.location.item-desires',
  'route-visits.visit-window.location.item-desires.item',
  'route-visits.visit-window.location.address',
  'route-visits.visit-window.location.visit-windows',
  'route-visits.visit-window.location.company',
  'route-visits.fulfillments',
  'route-visits.fulfillments.pod',
  'route-visits.fulfillments.pod.fulfillment',
  'route-visits.fulfillments.route-visit',
  'route-visits.fulfillments.stock',
  'route-visits.fulfillments.stock.fulfillment',
  'route-visits.fulfillments.stock.stock-levels',
  'route-visits.fulfillments.stock.stock-levels.item',
  'route-visits.fulfillments.credit-note',
  'route-visits.fulfillments.credit-note.fulfillment',
  'route-visits.fulfillments.credit-note.credit-note-items',
  'route-visits.fulfillments.credit-note.credit-note-items.item',
  'route-visits.fulfillments.order',
  'route-visits.fulfillments.order.fulfillment',
  'route-visits.fulfillments.order.order-items',
  'route-visits.fulfillments.order.order-items.item',
  'route-visits.fulfillments.order.location',
  'route-visits.fulfillments.order.location.address',
  'route-visits.fulfillments.order.location.item-desires',
  'route-visits.fulfillments.order.location.item-desires.item',
  'route-visits.fulfillments.order.location.company',
  'route-visits.fulfillments.order.location.company.price-tier',
  'route-visits.fulfillments.order.location.company.price-tier.item-prices'
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
