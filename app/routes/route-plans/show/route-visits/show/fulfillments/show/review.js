import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import Ember from 'ember';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model() {
    const fulfillment = this.modelFor('route-plans.show.route-visits.show.fulfillments.show');

    if(!fulfillment.belongsTo('pod').id()) {
      const pod = this.store.createRecord('pod');
      fulfillment.set('pod', pod);
    }

    return fulfillment;
  },

  actions: {
    onNameChanged(name) {
      const fulfillment = this.modelFor('route-plans.show.route-visits.show.fulfillments.show');
      fulfillment.set('pod.name', name.target.value);
      fulfillment.set('fulfillmentState', 'pending');
    },

    onSignature(signature) {
      const fulfillment = this.modelFor('route-plans.show.route-visits.show.fulfillments.show');
      fulfillment.set('pod.signature', signature);
      fulfillment.set('pod.signedAt', moment().toDate());
      fulfillment.set('fulfillmentState', 'pending');
    },

    submit() {
      const fulfillment = this.modelFor('route-plans.show.route-visits.show.fulfillments.show');
      fulfillment.set('creditNote.date', moment().toDate());

      fulfillment.set('fulfillmentState', 'pending');

      this.transitionTo('route-plans.show.route-visits.show.fulfillments.show');
    },

    didTransition() {
      this.navigator.requestReverse('route-plans.show.route-visits.show.fulfillments.show');

      const model = this.modelFor('route-plans.show.route-visits.show.fulfillments.show');

      this.stateInfo.display({
        label:model.get('order.location.name'),
        info:model.get('order.location.code')
      });
    }
  }
});
