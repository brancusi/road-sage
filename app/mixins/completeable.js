import Ember from 'ember';

const { or, not } = Ember.computed;

export default Ember.Mixin.create({
  notDirty:   not('hasDirtyAttributes'),
  completed:  or('notDirty', 'locallyCompleted')
});
