import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['row'],
  tagName: 'span',
  classNameBindings: ['disabled', 'flat:flat:card-1', 'completed'],

  didInsertElement() {
    this.mc = new Hammer(this.element);
    this.mc.on('tap', () => this.attrs.onClick());
  },

  willDestroyElement() {
    this.mc.destroy();
  }
});
