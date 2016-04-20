export function initialize(application) {
  application.inject('route', 'stateInfo', 'service:stateInfo');
}

export default {
  name: 'state-info',
  initialize
};
