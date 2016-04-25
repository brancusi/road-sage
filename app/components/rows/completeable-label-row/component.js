import Ember from 'ember';
import computed from 'ember-computed-decorators';
import Clickable from 'roadsage/mixins/clickable';

export default Ember.Component.extend(Clickable, {
  classNames:         ['row', 'card-1'],
  classNameBindings:  ['completed'],

  @computed('index')
  formattedIndex(index) {
    return index + 1;
  }
});
