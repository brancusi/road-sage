import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

export default Model.extend({
  fulfillmentState:   attr('string'),

  routeVisit:         belongsTo('route-visit'),
  order:              belongsTo('order'),
  stock:              belongsTo('stock'),
  creditNote:         belongsTo('credit-note'),
  pod:                belongsTo('pod')
});
