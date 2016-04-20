import Ember from 'ember';
import computed from 'ember-computed-decorators';
import moment from 'moment';

export default Ember.Component.extend({
  classNames: ['row', 'card-1'],

  didInsertElement() {
    this.tracker = setInterval(::this._calculateFromNow, 5000);
    this.mc = new Hammer(this.element);
    this.mc.on('tap', () => this.attrs.onClick(this.get('model')));
  },

  willDestroyElement() {
    clearInterval(this.tracker);
    this.mc.destroy();
  },

  _calculateFromNow() {
    const isToday = moment(this.get('model.date')).isSame(moment(), 'day');
    this.set('isToday', isToday);
  },

  @computed('model.{date}')
  date(date) {
    return moment(date).format('dddd - MMM Do');
  }
});
