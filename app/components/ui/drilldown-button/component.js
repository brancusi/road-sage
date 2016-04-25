import Ember from 'ember';
import Clickable from 'roadsage/mixins/clickable';

export default Ember.Component.extend(Clickable, {
  classNames: ['row'],
  tagName: 'span',
  classNameBindings: ['disabled', 'flat:flat:card-1', 'completed']
});
