import Ember from 'ember';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';
import computed from 'ember-computed-decorators';

export default Model.extend({
  date:               attr('date'),
  creditNoteNumber:   attr('string'),

  fulfillment:        belongsTo('fulfillment'),
  location:           belongsTo('location'),
  creditNoteItems:    hasMany('credit-note-item'),

  @computed('creditNoteItems.@each.{completed}')
  completed(records) {
    return records.every(r => r.get('completed'));
  }
});
