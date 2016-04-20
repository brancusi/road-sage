import Ember from 'ember';

const { alias } = Ember.computed;

export default Ember.Component.extend({
  address: alias('model.visitWindow.location.address'),
  streetAddress: alias('address.street'),
  city: alias('address.city'),
  zip: alias('address.zip')
});
