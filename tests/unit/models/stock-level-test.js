import { moduleForModel, test } from 'ember-qunit';

moduleForModel('stock-level', 'Unit | Model | stock level', {
  // Specify the other units that are required for this test.
  needs: ['model:item', 'model:stock']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
