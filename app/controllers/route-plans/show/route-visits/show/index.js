import Ember from 'ember';
import computed from 'ember-computed-decorators';

const { notEmpty, or } = Ember.computed;

export default Ember.Controller.extend({

  hasTempSignature: notEmpty('tempSignature'),
  canSubmit:        or('hasTempSignature', 'allFulfillmentsFulfilled'),

  @computed('model.fulfillments.@each.fulfilled')
  allFulfillmentsFulfilled(fulfillments) {
    return fulfillments.every(f => f.get('fulfilled'));
  },

  actions: {
    onSignature(signature, name, signedAt) {
      this.setProperties({tempSignature: signature, tempName: name, tempSignedAt: signedAt});

      this.get('model.fulfillments')
        .forEach(f => f.get('pod')
          .setProperties({signature, name, signedAt}));
    }
  }

});
