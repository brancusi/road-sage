import Ember from 'ember';
import ClickableMixin from 'roadsage/mixins/clickable';
import { module, test } from 'qunit';

module('Unit | Mixin | clickable');

// Replace this with your real tests.
test('it works', function(assert) {
  let ClickableObject = Ember.Object.extend(ClickableMixin);
  let subject = ClickableObject.create();
  assert.ok(subject);
});
