define([], function(){

	var generator = {};

	var indentMarker = "  ";
	var eventPrefix = "copernicus_event_";
	var sensorNames = ["light", "temperature", "knob", "motion"];

	//extract XML for the init section and for all sections of peripherals and timers events
	var getProgramXmlSections = function(programXml){
    	var allXml = programXml.childNodes;
		var xmlSections = {
			init: undefined,
			sensorEvents: {},
			buttonEvents: {},
			timerEvents: [],
			errors: []
		};
		var xmlErrors = [];

		for(var i = 0; i < allXml.length; ++i){
			var blockXml = allXml[i];

			var type = blockXml.attributes["type"].value;
			var sectionName;
			if(type.indexOf(eventPrefix) === 0){//event hander
				eventName = type.substr(eventPrefix.length, type.length);
				if(eventName == "timer"){//timer
					xmlSections.timerEvents.push(blockXml);
				}else if(sensorNames.indexOf(eventName) >= 0){//sensor
					if(xmlSections.sensorEvents[eventName]){
						xmlSections.errors.push("Duplicated event handler for " + eventName);
					}else{
						xmlSections.sensorEvents[eventName] = blockXml;
					}
				}else{
					if(xmlSections.buttonEvents[eventName]){//button
						xmlSections.errors.push("Duplicated event handler for " + eventName);
					}else{
						xmlSections.buttonEvents[eventName] = blockXml;
					}
				}
			}else{ //init
				if(xmlSections.init){
					xmlSections.errors.push("Duplicated init section");
				}else{
					xmlSections.init = blockXml;
				}
			}
		}



		if(xmlSections.init){
			var outerXml = programXml.cloneNode(false);
			outerXml.appendChild(xmlSections.init);
			xmlSections.init = outerXml;
		}

		for(eventName in xmlSections.sensorEvents){
			var outerXml = programXml.cloneNode();
			outerXml.appendChild(xmlSections.sensorEvents[eventName]);
			xmlSections.sensorEvents[eventName] = outerXml;
		}

		for(eventName in xmlSections.buttonEvents){
			var outerXml = programXml.cloneNode();
			outerXml.appendChild(xmlSections.buttonEvents[eventName]);
			xmlSections.buttonEvents[eventName] = outerXml;
		}

		for(var i=0; i<xmlSections.timerEvents.length; ++i){
			var outerXml = programXml.cloneNode();
			outerXml.appendChild(xmlSections.timerEvents[i]);
			xmlSections.timerEvents[i] = outerXml;
		}

		return xmlSections;
    };

    generator.generateCode = function(programXml){
    	//TODO check for errors

    	var programSectionsXmls = getProgramXmlSections(programXml);

    	var apiDeclaration = "from copernicus import Copernicus\n\napi = Copernicus()\n";
    	var mainLoop = "while True:\n" + indentMarker + "api.listen()\n"

    	var code = apiDeclaration;


    	for(eventName in programSectionsXmls.sensorEvents) {
    		eventXml = programSectionsXmls.sensorEvents[eventName];
			var headlessBlocksBoard = new Blockly.Workspace();
			Blockly.Xml.domToWorkspace(headlessBlocksBoard, eventXml);
			code += '\n' + Blockly.Python.workspaceToCode(headlessBlocksBoard);
			headlessBlocksBoard.dispose();
		}

		for(eventName in programSectionsXmls.buttonEvents) {
    		eventXml = programSectionsXmls.buttonEvents[eventName];
			var headlessBlocksBoard = new Blockly.Workspace();
			Blockly.Xml.domToWorkspace(headlessBlocksBoard, eventXml);
			code += '\n' + Blockly.Python.workspaceToCode(headlessBlocksBoard);
			headlessBlocksBoard.dispose();
		}



		initXml = programSectionsXmls.init;
		if(initXml){
			var headlessBlocksBoard = new Blockly.Workspace();
			Blockly.Xml.domToWorkspace(headlessBlocksBoard, initXml);
			code += '\n\n' + Blockly.Python.workspaceToCode(headlessBlocksBoard);
			headlessBlocksBoard.dispose();
		}

		code += '\n\n' + mainLoop;

    	return code;
    };

    return generator;

});