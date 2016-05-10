import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import Ember from 'ember';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  async model(params) {
    const fulfillment = this.modelFor('route-plans.show.route-visits.show.fulfillments.show');
    // const fulfillment = this.modelFor('route-plans.show.route-visits.show.fulfillments.show');
    const item = this.store.peekRecord('item', params.item_id);

    await this._prepCreditItem(fulfillment, item);
    await this._prepStockLevel(fulfillment, item);

    const stockLevel = fulfillment.get('stock.stockLevels').find(sl => sl.get('item.id') === item.get('id'));

    return {
      item,
      fulfillment,
      stockLevel
    };
  },

  // findCreditNoteItem(item) {
  //   const fulfillment = this.modelFor('route-plans.show.route-visits.show.fulfillments.show');
  //
  //   if(fulfillment.belongsTo('creditNote').value()) {
  //     return fulfillment.get('creditNote').creditNoteItemForItem(item);
  //   }
  // }

  // createCreditNoteItem(item) {
  //   const fulfillment = this.modelFor('route-plans.show.route-visits.show.fulfillments.show');
  //
  //   if(fulfillment.belongsTo('creditNote').value()) {
  //     return fulfillment.get('creditNote.creditNoteItems').find(cni => cni.get('item.id') === item.get('id'));
  //   } else {
  //     return undefined;
  //   }
  // }

  // findOrderCreateCreditNoteItem(item) {
  //   const fulfillment = this.modelFor('route-plans.show.route-visits.show.fulfillments.show');
  //
  //   let creditNote;
  //
  //   if(fulfillment.belongsTo('creditNote').value()) {
  //     creditNote = fulfillment.get('creditNote');
  //   } else {
  //     creditNote = this.store.createRecord('credit-note', {fulfillment, date:moment().format('MM-DD-YYYY')});
  //   }
  //
  //   let match = creditNote.get('creditNoteItems').find(cni => cni.get('item.id') === item.get('id'));
  //
  //   if(!match) {
  //     match = this.store.createRecord('credit-note-item', {creditNote, item});
  //   }
  // },

  async updateCreditNoteItem(item, quantity) {
    const fulfillment = this.modelFor('route-plans.show.route-visits.show.fulfillments.show');
    const creditNote = await fulfillment.get('creditNote');
    const location = await fulfillment.get('order.location');
    const creditNoteItem = creditNote.creditNoteItemForItem(item);

    if(creditNoteItem) {
      const rate = location.creditRateForItem(item);
      const itemPrice = await location.priceForItem(item);
      const unitPrice = rate * itemPrice;
      creditNoteItem.setProperties({unitPrice, quantity});
    }
  },

  actions: {
    startingChanged(val) {
      const dto = this.modelFor('route-plans.show.route-visits.show.fulfillments.show.tracking.item');
      dto.stockLevel.set('starting', val);
      dto.stockLevel.set('trackingState', 'pending');
      dto.fulfillment.set('deliveryState', 'pending');
      dto.fulfillment.set('routeVisit.routeVisitState', 'pending');
    },

    returnsChanged(val) {
      const dto = this.modelFor('route-plans.show.route-visits.show.fulfillments.show.tracking.item');
      dto.stockLevel.set('returns', val);
      dto.fulfillment.set('creditNote.xeroState', 'pending');
      this.updateCreditNoteItem(dto.item, val);

      dto.stockLevel.set('trackingState', 'pending');
      dto.fulfillment.set('deliveryState', 'pending');
      dto.fulfillment.set('routeVisit.routeVisitState', 'pending');
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

  async _prepStockLevel(fulfillment, item) {
    const location = await fulfillment.get('order.location');

    if(fulfillment.belongsTo('stock').value()) {
      const stock = await fulfillment.get('stock');
      const stockLevels = await stock.get('stockLevels');
      const match = stockLevels.find(sl => sl.get('item.id') === item.get('id'));

      if(!match) {
        this.store.createRecord('stock-level', {stock, item});
      }
    } else {
      const stock = this.store.createRecord('stock', {fulfillment, location});
      fulfillment.set('stock', stock);
      this.store.createRecord('stock-level', {stock, item});
    }
  },

  async _prepCreditItem(fulfillment, item) {
    const location = await fulfillment.get('order.location')

    if(fulfillment.belongsTo('creditNote').value()) {
      const creditNote = await fulfillment.get('creditNote');
      const match = creditNote.creditNoteItemForItem(item);
      if(!match && location.hasCreditForItem(item)) {
        this.store.createRecord('credit-note-item', {creditNote, item});
      }
    } else {
      if(location.hasCreditForItem(item)) {
        const creditNote = this.store.createRecord('creditNote', {fulfillment, location});
        this.store.createRecord('credit-note-item', {creditNote, item});
      }
    }
  }
});
