import Ember from 'ember';
import computed from 'ember-computed-decorators';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';

const { equal } = Ember.computed;

const SALES_ORDER = 'sales-order';
const PURCHASE_ORDER = 'purchase-order';

export default Model.extend({
  orderType:        attr('string', {defaultValue: SALES_ORDER}),
  deliveryDate:     attr('string'),

  location:         belongsTo('location'),
  orderItems:       hasMany('order-item'),
  fulfillment:      belongsTo('fulfillment'),

  isSalesOrder:     equal('orderType', SALES_ORDER),
  isPurchaseOrder:  equal('orderType', PURCHASE_ORDER),

  @computed('orderItems.@each.{quantity}')
  empty(orderItems) {
    return orderItems.every(so => so.get('empty'));
  },

  valid: true
});
