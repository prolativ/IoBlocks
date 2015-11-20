define(['blockly'], function(blockly){

	var generator = {};

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

    	var imports = "from copernicus import Copernicus\n"
    		+ "from copernicus_helpers import get_sensor_value\n" 
    		+ "from timer import Timer\n";

    	var variablesInit = "api = Copernicus()\n\n";

    	for(var i=0; i<sensorNames.length; ++i){
    		var sensorName = sensorNames[i];
    		variablesInit += sensorName + " = get_sensor_value('" + sensorName + "')\n";
    	}

    	variablesInit += "led_state = False\n";

    	var handlersCode = "";

    	for(eventName in programSectionsXmls.sensorEvents) {
    		eventXml = programSectionsXmls.sensorEvents[eventName];
			var headlessBlocksBoard = new blockly.Workspace();
			blockly.Xml.domToWorkspace(headlessBlocksBoard, eventXml);
			handlersCode += blockly.Python.workspaceToCode(headlessBlocksBoard) + "\n\n";
			headlessBlocksBoard.dispose();
		}

		for(eventName in programSectionsXmls.buttonEvents) {
    		eventXml = programSectionsXmls.buttonEvents[eventName];
			var headlessBlocksBoard = new blockly.Workspace();
			blockly.Xml.domToWorkspace(headlessBlocksBoard, eventXml);
			handlersCode += '\n' + blockly.Python.workspaceToCode(headlessBlocksBoard) + "\n\n";
			headlessBlocksBoard.dispose();
		}

		var mainTimerUsed = false;
		for(var i=0; i<programSectionsXmls.timerEvents.length; ++i) {
    		eventXml = programSectionsXmls.timerEvents[i];
			var headlessBlocksBoard = new blockly.Workspace();
			blockly.Xml.domToWorkspace(headlessBlocksBoard, eventXml);
			handlersCode += '\n' + blockly.Python.workspaceToCode(headlessBlocksBoard) + "\n\n";
			headlessBlocksBoard.dispose();
		}


		var eventsSubscribtion = "api.command('subscribe', '*')\n";
		var mainTimerStart = "timer_always.start()\n";


		var initXml = programSectionsXmls.init;
		var initCode = "";

		if(initXml){
			var headlessBlocksBoard = new blockly.Workspace();
			blockly.Xml.domToWorkspace(headlessBlocksBoard, initXml);
			initCode = blockly.Python.workspaceToCode(headlessBlocksBoard) + "\n\n";
			headlessBlocksBoard.dispose();
		}


		var mainLoop = "while True:\n" + blockly.Copernicus.indentMarker + "api.listen()\n\n";


		var code = imports + "\n\n" + variablesInit + "\n\n" + handlersCode + "\n" + eventsSubscribtion +
			"\n" + mainTimerStart + "\n\n" + initCode + mainLoop;

    	return code;
    };

    return generator;

});