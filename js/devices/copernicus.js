define(["blockly.base", "blockly.copernicus.blocks", "blockly.copernicus.python"], function(blockly){
	var device = {};

	device["name"] = "AGH Copernicus";

	device["generateCode"] = function(xml){
			var mainSectionName = "main";

	    	//extract XML sections for each event and the main section

	    	var allXml = xml.childNodes;
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

	return device;

});

