import Ember from 'ember';
import computed from 'ember-computed-decorators';
import moment from 'moment';

export default Ember.Controller.extend({

  @computed('model.{date}')
  date(date) {

    return moment('YYYY-MM-DD').format('dddd - MMM Do');
  }
});
