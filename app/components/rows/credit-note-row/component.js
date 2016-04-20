import Ember from 'ember';
import computed from 'ember-computed-decorators';

export default Ember.Component.extend({
  classNames: ['row', 'stretch'],
  classNameBindings: ['emphasize:emphasize']
});
