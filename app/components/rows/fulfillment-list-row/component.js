import Ember from 'ember';
import computed from 'ember-computed-decorators';

const {
  bool,
  alias
} = Ember.computed;

export default Ember.Component.extend({
  classNames: ['row', 'card-1'],
  classNameBindings: ['completed'],

  @computed('index')
  formattedIndex(index) {
    return index + 1;
  },

  locationName: alias('model.order.location.name'),
  locationCode: alias('model.order.location.code'),

  completed: bool('model.isFulfilled'),

  didInsertElement() {
    this.mc = new Hammer(this.element);
    this.mc.on('tap', () => this.attrs.onClick(this.get('model')));
  },

  willDestroyElement() {
    this.mc.destroy();
  }
});
