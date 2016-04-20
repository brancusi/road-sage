import { moduleForModel, test } from 'ember-qunit';
import { manualSetup, make, makeList } from 'ember-data-factory-guy';

moduleForModel('fulfillment', 'Unit | Model | fulfillment', {
  // Specify the other units that are required for this test.
  needs: [
    'model:address',
    'model:company',
    'model:item',
    'model:item-desire',
    'model:item-price',
    'model:location',
    'model:order',
    'model:order-item',
    'model:price-tier',
    'model:route-plan',
    'model:route-visit',
    'model:visit-day',
    'model:visit-window',
    'model:stock',
    'model:stock-level'
  ],

  beforeEach: function() {
    manualSetup(this.container);
  }
});

test('hasMultipleFulfillments true when there are multiple fulfillments', function(assert) {
  const fulfillments = makeList('fulfillment', 3);
  const routeVisit = make('route-visit', {fulfillments});

  assert.ok(routeVisit.get('hasMultipleFulfillments'));
});

test('hasMultipleFulfillments false when there is a single fulfillment', function(assert) {
  const fulfillments = makeList('fulfillment', 1);
  const routeVisit = make('route-visit', {fulfillments});

  assert.notOk(routeVisit.get('hasMultipleFulfillments'));
});
