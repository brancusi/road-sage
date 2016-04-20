import Ember from 'ember';

export function product(params) {
  return params.reduce((acc, cur) => acc * cur, 1);
}

export default Ember.Helper.helper(product);
