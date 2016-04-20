import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import Ember from 'ember';

export default Ember.Route.extend(AuthenticatedRouteMixin, {

  actions: {
    showFulfillment(fulfillment) {
      this.transitionTo('route-plans.show.route-visits.show.fulfillments.show', fulfillment.get('id'));
    },

    didTransition() {
      this.navigator.requestReverse('route-plans.show.index');

      const model = this.modelFor('route-plans.show.route-visits.show');

      this.stateInfo.display({
        label: model.get('visitWindow.location.company.name'),
        info: model.get('visitWindow.location.address.city')
      });
    }
  }
});
