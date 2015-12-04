define(['blockly.python',
        './commons',
        './blocklyBlocks',
        './blocklyGenerators'], function(){

	var generator = {};

	var Copernicus = Blockly.Copernicus;

    generator.generateCode = function(blocksBoard){
    	//TODO check for errors & warn the user

    	var generatedBlocksBoard = new Blockly.Workspace();
    	var copernicusBlock = Blockly.Block.obtain(generatedBlocksBoard, 'copernicus');
    	copernicusBlock.childBlocks_ = blocksBoard.getTopBlocks().slice();

    	Copernicus.activeSensors = [];
    	Copernicus.isAlwaysTimerDefined = false;

    	var shebang = "#!/usr/bin/env python\n";
    	var encoding = "# -*- coding: utf-8 -*-\n";
    	var blocksCode = Blockly.Python.workspaceToCode(generatedBlocksBoard);
    	var code = shebang + encoding + "\n" + blocksCode;

    	delete Copernicus.activeSensors;

    	return code;
    };

  return generator;

});