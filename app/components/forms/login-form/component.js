import Ember from 'ember';

const { notEmpty } = Ember;

export default Ember.Component.extend({

  hasError: notEmpty('errorMessage'),

  actions: {
    authenticate() {
      const { identification, password }= this.getProperties('identification', 'password');
      this.attrs.authenticate(identification, password);
    }
  }
});
