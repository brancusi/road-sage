import Ember from 'ember';
import _ from 'lodash/lodash';

const fulfilledParentPredicate = x => x.get('fulfillment.fulfilled');
const fulfilledPredicate = x => x.get('hasDirtyAttributes') && !x.get('isSaving') && x.get('fulfilled');
const dirtyRecordPredicate = x => x.get('hasDirtyAttributes') && !x.get('isSaving');
const validRecordPredicate = x => x.get('valid');
const cleanRecordPredicate = x => !x.get('hasDirtyAttributes');


export default Ember.Service.extend({

  store: Ember.inject.service(),

  start() {
    setInterval(::this._processQueue, 5000);
  },

  async _saveAllOfType(modelType) {
    const store = this.get('store');

    const records = store.peekAll(modelType)
      .filter(fulfilledParentPredicate);

    await Promise.all(records
      .filter(dirtyRecordPredicate)
      .filter(validRecordPredicate)
      .map(r => r.save()));

    return records;
  },

  async _saveFulfillmentRecordsOfType(modelType, childCollectionKey) {
    const records = await this._saveAllOfType(modelType);

    records.forEach(r => r.get(childCollectionKey)
      .filter(dirtyRecordPredicate)
      .forEach(r => r.save()));
  },

  async _processQueue() {
    const store = this.get('store');

    await this._saveAllOfType('pod');

    await Promise.all([
      this._saveFulfillmentRecordsOfType('stock', 'stockLevels'),
      this._saveFulfillmentRecordsOfType('order', 'orderItems'),
      this._saveFulfillmentRecordsOfType('credit-note', 'creditNoteItems')
    ]);

    store.peekAll('fulfillment')
      .filter(fulfilledPredicate)
      .filter(dirtyRecordPredicate)
      .map(r => r.save());

    // const source = Rx.Observable.from(this.get('store').peekAll('fulfillment').toArray())
    //   .filter(fulfilledPredicate)
    //   .map(fulfillment => {
    //     const order = fulfillment.get('order');
    //     const stock = fulfillment.get('stock');
    //     const creditNote = fulfillment.get('creditNote');
    //     // const pod = fulfillment.get('pod');
    //
    //     const orderItems = order.get('orderItems').toArray();
    //     const stockLevels = stock.get('stockLevels').toArray();
    //     const creditNoteItems = creditNote.get('creditNoteItems').toArray();
    //
    //     const parents = [order, stock, creditNote];
    //     const children = _.flatten([orderItems, stockLevels, creditNoteItems]);
    //     const allDeps = _.flatten([parents, children]);
    //
    //     return {
    //       fulfillment,
    //       parents,
    //       children,
    //       allDeps
    //     };
    //   });
    //
    // // Save parents
    // source
    //   .selectMany(payload => payload.parents)
    //   .filter(record => !!record.content)
    //   .map(record => record.get('content'))
    //   .filter(dirtyRecordPredicate)
    //   .map(record => record.save())
    //   .subscribe(
    //     (/*result*/) => {},
    //     (error) => {console.log(error);});
    //
    // // Save children
    // source
    //   .filter(payload => payload.parents
    //     .filter(record => !!record.content)
    //     .map(record => record.get('content'))
    //     .every(cleanRecordPredicate))
    //
    //   .selectMany(payload => payload.children)
    //   .filter(dirtyRecordPredicate)
    //   .map(record => record.save())
    //   .subscribe(
    //     (/*result*/) => {},
    //     (error) => {console.log(error);});
    //
    // // Save route visits
    // source
    //   .filter(payload => payload.allDeps
    //     .filter(record => !!record.content)
    //     .map(record => record.get('content'))
    //     .every(cleanRecordPredicate))
    //
    //   .map(payload => payload.fulfillment.save())
    //   .subscribe(
    //     (/*result*/) => {},
    //     (error) => {console.log(error);});
  }
});
