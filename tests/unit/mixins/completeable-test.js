import Ember from 'ember';
import CompleteableMixin from 'roadsage/mixins/completeable';
import { module, test } from 'qunit';

module('Unit | Mixin | completeable');

// Replace this with your real tests.
test('it works', function(assert) {
  let CompleteableObject = Ember.Object.extend(CompleteableMixin);
  let subject = CompleteableObject.create();
  assert.ok(subject);
});
