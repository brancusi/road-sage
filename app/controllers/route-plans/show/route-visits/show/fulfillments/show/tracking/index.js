import Ember from 'ember';
import computed from 'ember-computed-decorators';
// const { alias, filterBy, setDiff } = Ember.computed;

export default Ember.Controller.extend({
  // itemDesires: alias('model.routeVisit.visitWindow.location.itemDesires'),
  // enablesItemDesires: filterBy('itemDesires', 'enabled', true)

  @computed('model.stock.stockLevels.@each.{completed}', 'model.creditNote.creditNoteItems.@each.{completed}')
  items(stockLevels, creditNoteItems) {
    return stockLevels
      .map(stockLevel => {
        const creditNoteItem = creditNoteItems.find(cni => cni.get('item.id') === stockLevel.get('item.id'));
        return {
          label: stockLevel.get('item.name'),
          completed: stockLevel.get('completed') && creditNoteItem.get('completed'),
          stockLevel,
          creditNoteItem
        };
      });
  }
});
