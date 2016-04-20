import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('rows/completeable-label-row', 'Integration | Component | rows/completeable label row', {
  integration: true
});

test('It renders the correct label', function(assert) {
  const label = 'Label 1';
  const model = {key:'val'};

  this.set('label', label);
  this.set('model', model);
  this.render(hbs`{{rows/completeable-label-row label=label model=model}}`);

  assert.equal(this.$('.label').text().trim(), label);
});
