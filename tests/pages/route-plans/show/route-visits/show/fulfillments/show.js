import PO from 'roadsage/tests/page-object';

const { visitable } = PO;

export default PO.create({
  visit: visitable('/route-plans/:route_plan_id/route-visits/:route_visit_id/fulfillments/:fulfillment_id/')
});
