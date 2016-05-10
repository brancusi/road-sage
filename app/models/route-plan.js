import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { hasMany } from 'ember-data/relationships';
import computed from 'ember-computed-decorators';

export default Model.extend({
  date:               attr('string'),

  routeVisits:        hasMany('route-visit'),

  @computed('date')
  formattedDate(date) {
    return moment(date, 'YYYY-MM-DD').format("dddd, MMM Do - YYYY");
  },

  @computed('routeVisits.@each.{position}')
  sortedRouteVisits(routeVisits) {
    return routeVisits.sortBy('position');
  }
});
