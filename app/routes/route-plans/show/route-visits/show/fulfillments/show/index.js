import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import Ember from 'ember';

export default Ember.Route.extend(AuthenticatedRouteMixin, {

  actions: {
    track() {
      this.transitionTo('route-plans.show.route-visits.show.fulfillments.show.tracking');
    },

    review() {
      this.transitionTo('route-plans.show.route-visits.show.fulfillments.show.review');
    },

    submitFulfillment() {
      const fulfillment = this.modelFor('route-plans.show.route-visits.show.fulfillments.show');
      fulfillment.setProperties({deliveryState: 'fulfilled', submittedAt: moment().toDate()});
      fulfillment.set('creditNote.xeroState', 'submitted');
      fulfillment.set('order.xeroState', 'submitted');

      if(fulfillment.get('routeVisit.hasMultipleFulfillments')) {
        this.transitionTo('route-plans.show.route-visits.show');
      } else {
        this.transitionTo('route-plans.show');
      }
    },

    didTransition() {
      const model = this.modelFor('route-plans.show.route-visits.show.fulfillments.show');
      if(model.get('routeVisit.hasMultipleFulfillments')) {
        this.navigator.requestReverse('route-plans.show.route-visits.show');
      } else {
        this.navigator.requestReverse('route-plans.show');
      }

      this.stateInfo.display({
        label:model.get('order.location.name'),
        info:model.get('order.location.code')
      });
    }
  }
});
