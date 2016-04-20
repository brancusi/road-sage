import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';
import Completeable from 'roadsage/mixins/completeable';

export default Model.extend(Completeable, {
  quantity:   attr('number', {defaultValue:0}),

  item:       belongsTo('item'),
  stock:      belongsTo('stock')
});
