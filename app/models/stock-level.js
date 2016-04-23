import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

const { equal, not } = Ember.computed;

export default Model.extend({
  starting:       attr('number', {defaultValue:0}),
  returns:        attr('number', {defaultValue:0}),
  trackingState:  attr('string'),

  item:           belongsTo('item'),
  stock:          belongsTo('stock'),

  pending:        equal('trackingState', 'pending'),
  tracked:        not('pending')
});
