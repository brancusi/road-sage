import Ember from 'ember';

const { notEmpty } = Ember.computed;

export default Ember.Component.extend({
  classNames: ['row', 'stretch'],
  classNameBindings: ['emphasize'],

  hasQuantity: notEmpty('quantity')

});
