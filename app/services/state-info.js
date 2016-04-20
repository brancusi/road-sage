import Ember from 'ember';

const {
  notEmpty,
  alias
} = Ember.computed;

export default Ember.Service.extend({

  hasData: notEmpty('_data'),
  label: alias('_data.label'),
  info: alias('_data.info'),

  display(data) {
    this.set('_data', data);
  },

  clear() {
    this.set('_data', undefined);
  }
});
