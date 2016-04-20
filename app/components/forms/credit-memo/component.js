import Ember from 'ember';
import computed from 'ember-computed-decorators';
import moment from 'moment';

const { alias, gt, filterBy } = Ember.computed;

export default Ember.Component.extend({
  classNames: ['col', 'stretch', 'card-1'],
  classNameBindings: ['shouldDisplay::hidden'],

  shouldDisplay: gt('totalCredit', 0),

  creditNoteItems: alias('model.creditNote.creditNoteItems'),
  validCreditNoteItems: filterBy('creditNoteItems', 'hasCredit', true),

  @computed('model.routeVisit.routePlan.date')
  date(val) {
    return moment(val).format('MM/DD/YYYY');
  },

  @computed('validCreditNoteItems.@each.{quantity,unitPrice}')
  totalCredit(creditNoteItems = []) {
    return creditNoteItems.toArray().reduce((acc, cur) => {
      return acc + (cur.get('quantity') * cur.get('unitPrice'));
    }, 0);
  },

  creditRateForItemId() {
    return 1;
  }

});
