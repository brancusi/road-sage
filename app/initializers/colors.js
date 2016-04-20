import colors from 'roadsage/constants/colors';

export function initialize(application) {
  application.register('colors:main', colors, { instantiate: false });
  application.inject('controller', 'colors', 'colors:main');
  application.inject('component', 'colors', 'colors:main');
}

export default {
  name: 'colors',
  initialize
};
