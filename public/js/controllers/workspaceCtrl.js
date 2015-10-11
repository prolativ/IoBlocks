define(['./module',
		'blockly',
		'blockly.blocks',
		'blockly.msg',
		'blockly.python',
		'blockly.copernicus.blocks',
		'blockly.copernicus.python'
		], function (module, blockly) {
    
    'use strict';
    module.controller('workspaceCtrl', [function () {
    	var workspace = this;

    	workspace.deviceName = "copernicus";

	    workspace.blocksBoard = blockly.inject('workspaceDiv', {toolbox: document.getElementById('toolboxXml')});
	    
	    workspace.showCode = function(){
	    	alert(workspace.generateCode());
	    	//alert(Blockly.Python.workspaceToCode(workspace.blocksBoard));
	    };

	    workspace.showXml = function(){
	    	console.log(Blockly.Xml.workspaceToDom(workspace.blocksBoard));
	    };

	    workspace.parseXml = function(){

	    	var mainSectionName = "main";

	    	//extract XML sections for each event and the main section

	    	var allXml = Blockly.Xml.workspaceToDom(workspace.blocksBoard).childNodes;
			var xmlSections = {};
			var xmlErrors = [];
			var eventPrefix = "copernicus_event_";
			//var eventNames = ["light", "temperature", "knob", "button1", "button2"];
			for(var i = 0; i < allXml.length; ++i){
				var blockXml = allXml[i];

				var type = blockXml.attributes["type"];

				if(type.indexOf(eventPrefix) === 0){
					var eventName = type.substr(-1, type.length - eventPrefix.length);
					console.log("event name:", eventName);
					if(xmlSections.hasOwnProperty(eventName)){ //duplicated event handler
						xmlErrors.push("Duplicated event handler for " + eventName);
					}else{
						xmlSections[eventName] = blockXml;
					}
				}



				/*
				var isEvent = false;
				for(var j = 0; j < eventNames.length; ++j){
					var eventName = eventNames[i];
					if(eventName in blockXml.attributes){
						if(xmlSections.hasOwnProperty(eventName)){ //duplicated event handler
							xmlErrors.push("Duplicated event handler for " + eventName);
						}else{
							isEvent = true;
							xmlSections[eventName] = blockXml;
						}
						break;
					}
				}
				if(!isEvent){
					if(xmlSections.hasOwnProperty(mainSectionName)){ //duplicated event handler
						xmlErrors.push("More than one block section outside events");
					}else{
						xmlSections[mainSectionName] = blockXml;
					}
				}*/
			}

			console.log(xmlSections);
	    };

	    workspace.generateCode = function(){
	    	return Blockly.Python.workspaceToCode(workspace.blocksBoard);
	    	/*var allXml = Blockly.Xml.workspaceToDom(workspace.blocksBoard);
			var allCode = {};
			for (var i = 0, xml; xml = allXml[i]; i++) {
				console.log(xml);
				console.log(xml["type"]);
				var headless = new Blockly.Workspace();
				Blockly.Xml.domToWorkspace(headless, xml);
				allCode.push(Blockly.JavaScript.workspaceToCode(headless));
				headless.dispose();
			}*/
	    };

    }]);
});