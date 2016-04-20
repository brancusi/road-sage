import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { hasMany } from 'ember-data/relationships';
import computed from 'ember-computed-decorators';

export default Model.extend({
  name:               attr('string'),
  date:               attr('string'),

  routeVisits:        hasMany('route-visit'),

  @computed('date')
  formattedDate(date) {
    return moment(date, 'YYYY-MM-DD').format("dddd, MMM Do - YYYY");
  }
});
