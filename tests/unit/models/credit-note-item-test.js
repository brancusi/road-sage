import { moduleForModel, test } from 'ember-qunit';

moduleForModel('credit-note-item', 'Unit | Model | credit note item', {
  // Specify the other units that are required for this test.
  needs: ['model:credit-note', 'model:item']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
