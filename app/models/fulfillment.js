import Ember from 'ember';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

const { equal, not } = Ember.computed;

export default Model.extend({
  deliveryState:      attr('string'),
  notificationState:  attr('string'),
  submittedAt:        attr('date'),

  routeVisit:         belongsTo('route-visit'),
  order:              belongsTo('order'),
  stock:              belongsTo('stock'),
  creditNote:         belongsTo('credit-note'),
  pod:                belongsTo('pod'),

  pending:            equal('deliveryState', 'pending'),
  fulfilled:          not('pending')
});
