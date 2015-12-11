(function(){
  var setCommentTextSvg = Blockly.BlockSvg.prototype.setCommentText;
  Blockly.BlockSvg.prototype.setCommentText = function(text) {
    var result = setCommentTextSvg.apply(this, arguments);
    this.workspace.fireChangeEvent();
    return result;
  }

  var dispose = Blockly.Bubble.prototype.dispose;
  Blockly.Bubble.prototype.dispose = function(){
    var workspace = this.workspace_;
    var result = dispose.apply(this, arguments);
    workspace.fireChangeEvent();
    return result;
  }
})();