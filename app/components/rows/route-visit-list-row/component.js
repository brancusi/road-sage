import Ember from 'ember';
import computed from 'ember-computed-decorators';
import Clickable from 'roadsage/mixins/clickable';

const {
  bool,
  alias
} = Ember.computed;

export default Ember.Component.extend(Clickable, {
  classNames: ['row', 'card-1'],
  classNameBindings: ['completed'],

  @computed('index')
  formattedIndex(index) {
    return index + 1;
  },

  companyName: alias('model.visitWindow.location.company.name'),
  companyAddress: alias('model.visitWindow.location.address.street'),
  companyCity: alias('model.visitWindow.location.address.city'),

  completed: bool('model.isFulfilled')
});
