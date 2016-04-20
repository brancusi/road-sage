import Ember from 'ember';

const {
  notEmpty
} = Ember.computed;

export default Ember.Service.extend({
  //@TODO Just register the last route, no need for all this.
  _routing: Ember.inject.service('-routing'),
  // _routeHistory: [],
  _scrollMap: {},
  // _backRoute: new Immutable.OrderedSet(),

  hasRoute: notEmpty('_backRoute'),

  init() {
    this._super();
    this._addListener();
  },

  clearRoute() {
    this.set('_backRoute', undefined);
  },

  requestReverse(route) {
    // const newSet =
    //   this.get('_routeStack').add(route)
    //   .takeUntil(x => )

    this.set('_backRoute', route);
    // this.set('_routeHistory', newSet.toJS());
  },

  // pop() {
  //   const prev = this.get('_routeStack').last();
  //   const newSet = this.get('_routeStack').butLast();
  //   this.set('_routeStack', newSet);
  //   this.set('_routeHistory', newSet.toJS());
  //   return prev;
  // },

  goBack() {
    if(this.get('hasRoute')){
      this.get('_routing').transitionTo(this.get('_backRoute'));
    }
  },

  _addListener() {
    this.get('_routing.router').on('willTransition', ::this._handleWillTransition);
    this.get('_routing.router').on('didTransition', ::this._handleDidTransition);
  },

  _handleWillTransition() {
    this._scrollMap[this.get('_routing.currentRouteName')] = window.scrollY;
  },

  _handleDidTransition() {
    const scrollY = this._scrollMap[this.get('_routing.currentRouteName')];
    Ember.run.later('afterRender', () => window.scrollTo(0, scrollY));
    this._scrollMap[this.get('_routing.currentRouteName')] = 0;
  }
});
