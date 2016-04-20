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
      // console.log('submitFulfillment');
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
