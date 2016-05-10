import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['relative'],

  didInsertElement() {
    Ember.run.scheduleOnce('afterRender', this, this.afterRenderHandler);

    this.resizeSubcription = Rx.Observable.fromEvent(window, 'resize')
      .throttle(250)
      .subscribe(() => this.prepareCanvas());
  },

  willDestroyElement() {
    this.resizeSubcription.dispose();
  },

  prepareCanvas() {
    const ratio =  Math.max(window.devicePixelRatio || 1, 1);
    this.$canvas.width = this.$canvas.offsetWidth * ratio;
    this.$canvas.height = this.$canvas.offsetHeight * ratio;
    this.$canvas.getContext("2d").scale(ratio, ratio);
  },

  afterRenderHandler : function(){
    this.$canvas = this.$('canvas')[0];
    this.signaturePad = new SignaturePad(this.$canvas, {onEnd: ::this.onEndHandler});
    this.prepareCanvas();
	},

  onEndHandler() {
    this.attrs.drawingEnded(this.signaturePad.toDataURL());
  }
});
