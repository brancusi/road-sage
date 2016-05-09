import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';

const { alias, gt } = Ember.computed;

export default Model.extend({
  name:                 attr('string'),
  code:                 attr('string'),
  deliveryRate:         attr('number',  { defaultValue: 10 }),
  active:               attr('boolean', { defaultValue: true }),

  address:              belongsTo('address'),
  company:              belongsTo('company'),
  itemDesires:          hasMany('item-desire'),
  orders:               hasMany('order'),
  stocks:               hasMany('stock'),
  creditNotes:          hasMany('credit-note'),
  visitDays:            hasMany('visit-day'),

  visitWindows:         alias('address.visitWindows'),
  lat:                  alias('address.lat'),
  lng:                  alias('address.lng')
});
