import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';

export default Model.extend({
	min: 							attr('number', {defaultValue: 480}),
  max: 							attr('number', {defaultValue: 720}),
	service: 					attr('number', {defaultValue: 15}),

	location: 				belongsTo('location'),
	visitWindowDays: 	hasMany('visit-window-day')
});
