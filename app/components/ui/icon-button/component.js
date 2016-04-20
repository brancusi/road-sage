import Ember from 'ember';
import style from 'roadsage/utils/styles';
import colors from 'roadsage/constants/colors';

const {
  computed: {
    notEmpty
  }
} = Ember;

export default Ember.Component.extend({
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
  },

  didInsertElement() {
    this.mc = new Hammer.Manager(this.element);
    this.mc.add( new Hammer.Tap({ event: 'singleTap', taps: 1, time: 1000 }) );
    this.mc.on('singleTap', () => this.attrs.onClick());
  },

  willDestroyElement() {
    this.mc.destroy();
  }
});
