import Ember from 'ember';
import computed from 'ember-computed-decorators';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';

const { alias, gt } = Ember.computed;

export default Model.extend({
  position:       attr('number'),
  arriveAt:       attr('number'),
  departAt:       attr('number'),

  fulfillments:   hasMany('fulfillment'),
  routePlan:      belongsTo('route-plan'),
  visitWindow:    belongsTo('visit-window'),

  hasMultipleFulfillments: gt('fulfillments.length', 1),

  defaultFulfillment: alias('fulfillments.firstObject'),

  @computed('position')
  positionFormatted(position) {
    return position + 1;
  }
});
