import Ember from 'ember';
import _ from 'lodash/lodash';

const routeVisitPredicate = x => x.get('hasDirtyAttributes') && !x.get('isSaving') && x.get('fulfilled');
const dirtyRecordPredicate = x => x.get('hasDirtyAttributes') && !x.get('isSaving');

export default Ember.Service.extend({

  bootstrap(config) {
    this.config = config;
    this._startTimer();
  },

  _startTimer() {
    setInterval(::this._processQueue, 5000);
  },

  _processQueue() {
    const { store } = this.config;

    const source = Rx.Observable.from(store.peekAll('route-visit').toArray())
      .filter(routeVisitPredicate)
      .map(rv => {
        const itemLevels = rv.get('itemLevels').toArray();
        const orders = rv.get('orders').toArray();
        const records = _.flatten(_.merge([], [itemLevels, orders]));

        return {
          rv,
          records
        };
      });

    // Save records
    source
      .selectMany(payload => payload.records)
      .filter(dirtyRecordPredicate)
      .map(record => record.save())
      .subscribe(
        (/*result*/) => {},
        (/*error*/) => {});

    // Save route visits
    source
      .filter(payload => !payload.records.every(dirtyRecordPredicate))
      .map(payload => payload.rv.save())
      .subscribe(
        (/*result*/) => {},
        (/*error*/) => {});
  }

});
