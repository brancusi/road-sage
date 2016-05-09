import Ember from 'ember';

const fulfilledParentPredicate = x => x.get('fulfillment.fulfilled');
const fulfilledPredicate = x => x.get('hasDirtyAttributes') && !x.get('isSaving') && x.get('fulfilled');
const dirtyRecordPredicate = x => x.get('hasDirtyAttributes') && !x.get('isSaving');


export default Ember.Service.extend({
  store: Ember.inject.service(),

  start() {
    setInterval(::this._processQueue, 200);
  },

  async _saveAllOfType(modelType) {
    const store = this.get('store');

    const records = store.peekAll(modelType)
      .filter(fulfilledParentPredicate);

    await Promise.all(records
      .filter(dirtyRecordPredicate)
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
    if(!this.processing) {
      this.processing = true;
      console.log('Entered processing!');

      const store = this.get('store');

      await Promise.all([
        this._saveAllOfType('pod'),
        this._saveFulfillmentRecordsOfType('stock', 'stockLevels'),
        this._saveFulfillmentRecordsOfType('order', 'orderItems'),
        this._saveFulfillmentRecordsOfType('credit-note', 'creditNoteItems')
      ]);

      await Promise.all(store.peekAll('fulfillment')
        .filter(fulfilledPredicate)
        .filter(dirtyRecordPredicate)
        .map(r => r.save()));

      await Promise.all(store.peekAll('route-visit')
        .filter(fulfilledPredicate)
        .filter(dirtyRecordPredicate)
        .map(r => r.save()));

      this.processing = false;
    }
  }
});
