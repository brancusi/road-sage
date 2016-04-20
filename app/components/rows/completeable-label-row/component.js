import Ember from 'ember';
import computed from 'ember-computed-decorators';

export default Ember.Component.extend({
  classNames: ['row', 'card-1'],
  classNameBindings: ['completed'],

  @computed('index')
  formattedIndex(index) {
    return index + 1;
  },

  didInsertElement() {
    this.mc = new Hammer(this.element);
    this.mc.on('tap', () => this.attrs.onClick(this.get('model')));
  },

  willDestroyElement() {
    this.mc.destroy();
  }
});
