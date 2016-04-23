import Ember from 'ember';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

const { and, gt } = Ember.computed;

export default Model.extend({
  quantity:     attr('number', {defaultValue: 0}),
  unitPrice:    attr('number', {defaultValue: 0}),
  description:   attr('string'),

  creditNote:   belongsTo('credit-note'),
  item:         belongsTo('item'),

  hasQuantity:  gt('quantity', 0),
  hasUnitPrice: gt('unitPrice', 0),

  hasCredit:    and('hasQuantity', 'hasUnitPrice')
});
