define(['blockly.python',
        './commons',
        './blocklyBlocks',
        './blocklyGenerators'], function(){

  var generator = {};

  var Copernicus = Blockly.Copernicus;

    generator.generateCode = function(workspace){
      //TODO check for errors & warn the user

      //inject copernicus block
      var extendedWorkspace = new Blockly.Workspace();
      var copernicusBlock = Blockly.Block.obtain(extendedWorkspace, 'copernicus');
      copernicusBlock.childBlocks_ = workspace.getTopBlocks().slice();

      Copernicus.activeSensors = [];
      Copernicus.textInputEvent = undefined;
      Copernicus.isAlwaysTimerDefined = false;

      var encoding = "# -*- coding: utf-8 -*-\n";
      var blocksCode = Blockly.Python.workspaceToCode(extendedWorkspace);
      var code = encoding + "\n" + blocksCode;

      delete Copernicus.activeSensors;

      return code;
    };

  return generator;

});