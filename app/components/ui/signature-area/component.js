import Ember from 'ember';

export default Ember.Component.extend({
  didInsertElement() {
    Ember.run.scheduleOnce('afterRender', this, this._afterRenderHandler);
  },

  _prepareCanvas() {
    const $canvas = this.$('canvas')[0];
    const ratio =  window.devicePixelRatio || 1;

    $canvas.width = $canvas.offsetWidth * ratio;
    $canvas.height = $canvas.offsetHeight * ratio;
    $canvas.getContext("2d").scale(ratio, ratio);

    return $canvas;
  },

  _afterRenderHandler : function(){
    this.signaturePad = new SignaturePad(this._prepareCanvas(), {onEnd:this._drawingEnded.bind(this)});
	},

  _drawingEnded() {
    this.attrs.drawingEnded(this.signaturePad.toDataURL())
  }
});
