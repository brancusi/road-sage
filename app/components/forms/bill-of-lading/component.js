import Ember from 'ember';
import computed from 'ember-computed-decorators';
import moment from 'moment';

export default Ember.Component.extend({
  classNames: ['col', 'stretch', 'card-1'],

  @computed('model.order.orderItems.[]')
  totalQuantity(orderItems) {
    return orderItems.reduce((acc, cur) => acc + cur.get('quantity'), 0);
  },

  @computed('model.order.deliveryDate')
  date(deliveryDate) {
    return moment(deliveryDate).format('MM/DD/YYYY');
  }

});
