import Ember from 'ember';
import computed from 'ember-computed-decorators';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';

const { alias, gt, equal, not } = Ember.computed;

export default Model.extend({
  position:         attr('number'),
  arriveAt:         attr('number'),
  departAt:         attr('number'),
  routeVisitState:  attr('string'),

  fulfillments:   hasMany('fulfillment'),
  routePlan:      belongsTo('route-plan'),
  address:        belongsTo('address'),

  visitWindow:    alias('address.visitWindows.firstObject'),
  lat:            alias('address.lat'),
  lng:            alias('address.lng'),

  pending:        equal('routeVisitState', 'pending'),
  fulfilled:      not('pending'),

  hasMultipleFulfillments: gt('fulfillments.length', 1),

  defaultFulfillment: alias('fulfillments.firstObject'),

  @computed('position')
  positionFormatted(position) {
    return position + 1;
  }

  // @computed('fulfillments.@each.{completed}')
  // fulfilled(records) {
  //   return records.every(r => r.get('fulfilled'));
  // }
});
