import Ember from 'ember';

const {
  and,
  alias,
  empty,
  notEmpty
} = Ember.computed;

export default Ember.Component.extend({
  hasName: notEmpty('name'),
  hasSignature: notEmpty('signature'),
  readyToSubmit: and('hasName', 'tempSignature'),

  actions: {
    requestedSign() {
      this.setProperties({signing:true, tempSignature:undefined});
    },

    cancel() {
      this.setProperties({signing:false, tempSignature:undefined});
    },

    submit() {
      this.attrs.onSignature(this.get('tempSignature'));
      this.setProperties({signing:false, tempSignature:undefined});
    },

    handleNewSignature(data) {
      this.set('tempSignature', data);
    }
  }
});
