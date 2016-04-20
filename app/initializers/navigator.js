export function initialize(application) {
  application.inject('route', 'navigator', 'service:navigator');
  application.inject('controller', 'navigator', 'service:navigator');
}

export default {
  name: 'navigator',
  initialize
};
