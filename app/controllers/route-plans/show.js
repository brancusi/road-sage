import Ember from 'ember';
import computed from 'ember-computed-decorators';
import moment from 'moment';

export default Ember.Controller.extend({

  @computed('model.{date}')
  date(date) {
    return moment(date).format('dddd - MMM Do');
  }
});
