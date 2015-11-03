define([], function(){

	var generator = {};

	//extract XML sections for each event and the init section
	var getProgramXmlSections = function(programXml){
    	var allXml = programXml.childNodes;
		var xmlSections = {
			init: undefined,
			events: {},
			errors: []
		};
		var xmlErrors = [];
		var eventPrefix = "copernicus_event_";

		for(var i = 0; i < allXml.length; ++i){
			var blockXml = allXml[i];

			var type = blockXml.attributes["type"].value;
			var sectionName;
			if(type.indexOf(eventPrefix) === 0){//hander
				eventName = type.substr(eventPrefix.length, type.length);
				if(xmlSections.events[eventName]){
					xmlSections.errors.push("Duplicated event handler for " + eventName);
				}else{
					xmlSections.events[eventName] = blockXml;
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

		for(eventName in xmlSections.events){
			var outerXml = programXml.cloneNode();
			outerXml.appendChild(xmlSections.events[eventName]);
			xmlSections.events[eventName] = outerXml;
		}

		return xmlSections;
    };

    generator.generateCode = function(programXml){
    	//TODO check for errors

    	var programSectionsXmls = getProgramXmlSections(programXml);

    	var apiDeclaration = "from copernicus import Copernicus\n\napi = Copernicus()\n";
    	var mainLoop = "while True:\n    api.listen()\n"

    	var code = apiDeclaration;

    	for(eventName in programSectionsXmls.events) {
    		eventXml = programSectionsXmls.events[eventName];
			var headlessBlocksBoard = new Blockly.Workspace();
			Blockly.Xml.domToWorkspace(headlessBlocksBoard, eventXml);
			code += '\n' + Blockly.Python.workspaceToCode(headlessBlocksBoard);
			headlessBlocksBoard.dispose();
		}



		initXml = programSectionsXmls.init;
		if(initXml){
			var headlessBlocksBoard = new Blockly.Workspace();
			Blockly.Xml.domToWorkspace(headlessBlocksBoard, initXml);
			console.log(Blockly.Python.workspaceToCode(headlessBlocksBoard));
			code += '\n\n' + Blockly.Python.workspaceToCode(headlessBlocksBoard);
			headlessBlocksBoard.dispose();
		}

		code += '\n\n' + mainLoop;

    	return code;
    };

    return generator;

});