import Ember from 'ember';
import computed from 'ember-computed-decorators';

const { and } = Ember.computed;

export default Ember.Controller.extend({
  trackingCompleted: and('model.stock.completed', 'model.creditNote.completed')
});
