import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['row'],

  didInsertElement() {
    TweenMax.to(this.$('.syncIcon'), 1, {rotation:-360, repeat:-1, ease: Linear.easeNone});
  }
});
