import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import Ember from 'ember';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model(params) {
    const fulfillment = this.modelFor('route-plans.show.route-visits.show.fulfillments.show');

    // this._prepStockLevel(fulfillment, params.item_id);
    // this._prepCreditItem(fulfillment, params.item_id);

    const stockLevel = fulfillment.get('stock.stockLevels').find(sl => sl.get('item.id') === params.item_id);
    const creditNoteItem = fulfillment.get('creditNote.creditNoteItems').find(cni => cni.get('item.id') === params.item_id);
    return {
      fulfillment,
      stockLevel,
      creditNoteItem
    };
  },
  actions: {
    startingChanged(val) {
      const dto = this.modelFor('route-plans.show.route-visits.show.fulfillments.show.tracking.item');
      dto.stockLevel.set('starting', val);
      dto.stockLevel.set('trackingState', 'pending');
      dto.fulfillment.set('fulfillmentState', 'pending');
    },

    returnsChanged(val) {
      const dto = this.modelFor('route-plans.show.route-visits.show.fulfillments.show.tracking.item');
      dto.stockLevel.set('returns', val);
      dto.creditNoteItem.set('quantity', val);

      dto.stockLevel.set('trackingState', 'pending');
      dto.fulfillment.set('fulfillmentState', 'pending');
    },

    didTransition() {
      this.navigator.requestReverse('route-plans.show.route-visits.show.fulfillments.show.tracking');

      const model = this.modelFor('route-plans.show.route-visits.show.fulfillments.show');

      this.stateInfo.display({
        label:model.get('order.location.name'),
        info:model.get('order.location.code')
      });
    },

    markCompleted() {
      const dto = this.modelFor('route-plans.show.route-visits.show.fulfillments.show.tracking.item');

      dto.stockLevel.set('trackingState', 'tracked');

      this.transitionTo('route-plans.show.route-visits.show.fulfillments.show.tracking');
    }
  },

  _prepStockLevel(fulfillment, itemId) {
    const item = this.store.peekRecord('item', itemId);
    if(fulfillment.belongsTo('stock').value()) {
      const stockLevels = fulfillment.get('stock.stockLevels') || [];
      const isMissing = stockLevels.every(sl => sl.get('item.id') !== item.get('id'));

      if(isMissing) {
        this.store.createRecord('stock-level', {stock:fulfillment.get('stock'), item});
      }
    } else {
      const stock = this.store.createRecord('stock', {fulfillment, location:fulfillment.get('routeVisit.visitWindow.location')});
      this.store.createRecord('stock-level', {stock, item});
    }
  },

  _prepCreditItem(fulfillment, itemId) {
    const item = this.store.peekRecord('item', itemId);
    if(fulfillment.belongsTo('creditNote').value()) {
      const creditNoteItems = fulfillment.get('creditNote.creditNoteItems') || [];
      const isMissing = creditNoteItems.every(cni => cni.get('item.id') !== item.get('id'));

      if(isMissing) {
        this.store.createRecord('credit-note-item', {creditNote:fulfillment.get('creditNote'), item});
      }
    } else {
      const creditNote = this.store.createRecord('creditNote', {fulfillment, location:fulfillment.get('routeVisit.visitWindow.location')});
      this.store.createRecord('credit-note-item', {creditNote, item});
    }
  }
});
