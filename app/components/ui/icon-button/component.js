import Ember from 'ember';
import style from 'roadsage/utils/styles';
import colors from 'roadsage/constants/colors';
import Clickable from 'roadsage/mixins/clickable';

const {
  computed: {
    notEmpty
  }
} = Ember;

export default Ember.Component.extend(Clickable, {
  classNames: ['row'],
  classNameBindings: ['disabled', 'flat:flat:card-1'],
  attributeBindings:['componentStyles:style'],

  hasLabel: notEmpty('label'),

  @style('size', 'color', 'backgroundColor', 'borderRadius')
  componentStyles(
    size = '1',
    color = 'white',
    backgroundColor = colors.SKY_BLUE,
    borderRadius = 0
  ) {
    return {
      'padding': `${size}em`,
      'font-size': `${size/2}em`,
      'border-radius': `${borderRadius}px`,
      'color': color,
      'background-color': backgroundColor
    };
  }
});
