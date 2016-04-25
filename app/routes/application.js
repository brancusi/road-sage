import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
import { storageFor } from 'ember-local-storage';

export default Ember.Route.extend(ApplicationRouteMixin, {
  remoteSync: Ember.inject.service('remote-sync'),
  // routePlansLS: storageFor('routePlans'),

  init () {
    this._super();
    this.get('remoteSync').start();
  },

  beforeModel() {
    // console.log(this.get('routePlansLS'));
    // debugger;
  }
});
