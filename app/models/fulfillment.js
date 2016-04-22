import Ember from 'ember';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

const { equal, not } = Ember.computed;

export default Model.extend({
  fulfillmentState:   attr('string'),
  submittedAt:        attr('date'),

  routeVisit:         belongsTo('route-visit'),
  order:              belongsTo('order'),
  stock:              belongsTo('stock'),
  creditNote:         belongsTo('credit-note'),
  pod:                belongsTo('pod'),

  pending:            equal('fulfillmentState', 'pending'),
  fulfilled:          not('pending')
});
