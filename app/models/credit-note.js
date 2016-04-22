import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';
import computed from 'ember-computed-decorators';

export default Model.extend({
  date:               attr('date'),
  creditNoteNumber:   attr('string'),

  location:           belongsTo('location'),
  fulfillment:        belongsTo('fulfillment'),
  creditNoteItems:    hasMany('credit-note-item'),

  @computed('creditNoteItems.@each.{completed}')
  completed(records) {
    return records.every(r => r.get('completed'));
  },

  valid: true
});
