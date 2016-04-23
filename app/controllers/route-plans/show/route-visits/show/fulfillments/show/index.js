import Ember from 'ember';

const { and } = Ember.computed;

export default Ember.Controller.extend({
  trackingCompleted: and('model.stock.tracked')
});
