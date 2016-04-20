import { test } from 'qunit';
import moduleForAcceptance from 'roadsage/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'roadsage/tests/helpers/ember-simple-auth';
import showPage from 'roadsage/tests/pages/route-plans/show/route-visits/show';

import applicationPage from 'roadsage/tests/pages/application';

import {
  make,
  makeList,
  mockFind
} from 'ember-data-factory-guy';

moduleForAcceptance('Acceptance | route visits', {
  beforeEach() {
    authenticateSession(this.application);
  }
});

test('can view list of fulfillments', async function(assert) {
  const routePlan = make('route-plan');
  const fulfillments = makeList('fulfillment', 3);
  const routeVisit = make('route-visit', {routePlan, fulfillments});

  mockFind('route-plan').returns({model: routePlan});
  mockFind('route-visit').returns({model: routeVisit});

  await showPage.visit({route_plan_id:routePlan.get('id'), route_visit_id:routeVisit.get('id')});

  assert.equal(showPage.fulfillments().count, 3);
});

test('can select a fulfillment', async function(assert) {
  const routePlan = make('route-plan');
  const fulfillment = make('fulfillment');
  const routeVisit = make('route-visit', {routePlan, fulfillments:[fulfillment]});

  mockFind('route-plan').returns({model: routePlan});
  mockFind('route-visit').returns({model: routeVisit});

  await showPage
    .visit({route_plan_id:routePlan.get('id'), route_visit_id:routeVisit.get('id')})
    .fulfillments(0)
    .click();

  const urlToMatch = `/route-plans/${routePlan.get('id')}/route-visits/${routeVisit.get('id')}/fulfillments/${fulfillment.get('id')}`;
  assert.equal(currentURL(), urlToMatch);
});

test('should navigate back to route visit list', async function(assert) {
  const routePlan = make('route-plan');
  const fulfillment = make('fulfillment');
  const routeVisit = make('route-visit', {routePlan, fulfillments:[fulfillment]});

  mockFind('route-plan').returns({model: routePlan});
  mockFind('route-visit').returns({model: routeVisit});

  await showPage.visit({route_plan_id:routePlan.get('id'), route_visit_id:routeVisit.get('id')});

  await applicationPage.goBack();

  const urlToMatch = `/route-plans/${routePlan.get('id')}`;
  assert.equal(currentURL(), urlToMatch);
});
