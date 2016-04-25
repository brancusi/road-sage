import Ember from 'ember';
import computed from 'ember-computed-decorators';
import moment from 'moment';
import Clickable from 'roadsage/mixins/clickable';

const { equal } = Ember.computed;

export default Ember.Component.extend(Clickable, {
  classNames: ['row', 'card-1'],

  isToday: equal('date', moment().format('dddd - MMM Do')),

  @computed('model.{date}')
  date(date) {
    return moment(date).format('dddd - MMM Do');
  }
});
