/*
(function(){

	var Copernicus = Blockly.Copernicus;

	var indentMarker = "  ";

	function createSensorHandlerCodeGenerator(eventName){
		function codeGenerator(block){
			var signature = "def " + eventName + "_handler(sensor_value):\n";
			var sensorValueAssignment = indentMarker + eventName + " = sensor_value\n";
			var handlerBody = Blockly.Python.statementToCode(block, 'REACTION_BLOCK') || "";
			var settingHandler = "api.set_handler('" + eventName + "', " + eventName + "_handler)\n";
			var subscribing = "api.subscribe('" + eventName + "'')\n";
			var code = signature + sensorValueAssignment + handlerBody + "\n" + settingHandler + subscribing;
			return code;
		}

		return codeGenerator;
	};


	function createButtonHandlerCodeGenerator(eventName){
		function codeGenerator(block){
			var signature = "def " + eventName + "_handler(button_state):\n";
			var handlerBody = Blockly.Python.statementToCode(block, 'REACTION_BLOCK') || "";
			var settingHandler = "api.set_handler('" + eventName + "', " + eventName + "_handler)\n";
			var subscribing = "api.subscribe('" + eventName + "'')\n";
			var code = signature + handlerBody + "\n" + settingHandler + subscribing;
			return code;
		}

		return codeGenerator;
	};


	for(var i=0; i<Copernicus.sensors.length; ++i){
		var sensor = Copernicus.sensors[i];
		Blockly.Python["copernicus_event_" + sensor.apiName] = createSensorHandlerCodeGenerator(sensorName);
		Blockly.Python["copernicus_get_" + sensor.apiName] = function(block){
			return [sensor.apiName, Blockly.Python.ORDER_ATOMIC];
		};
	}

	for(var i=0; i<Copernicus.buttons.length; ++i){
		var button = Copernicus.buttons[i];
		Blockly.Python["copernicus_event_" + button.apiName] = createButtonHandlerCodeGenerator(button.fullName);
	}


	Blockly.Python['copernicus_set_servo'] = function(block){
		var position = Blockly.Python.valueToCode(block, 'POSITION', Blockly.Python.ORDER_ATOMIC) || 0;
		var code = "api.command('servo', " + position + ")\n"; //Should position be divided by 2?
		return code;
	};

	Blockly.Python['copernicus_set_led_white'] = function(block) {
		var state;
		switch(block.getFieldValue('LED_STATE')){
			case "LED_TOGGLE": state = '!led_state'; break;
			case "LED_ON": state = 'True'; break;
			default: state = 'False'
		}
		var code = "led_state = " + state + "\napi.command('led', led_state)\n";
		return code;
	};	
	
	//Blockly.Python['copernicus_set_led_colour'] = function(block){
		//var colour = Blockly.Python.valueToCode(block, 'COLOUR', Blockly.Python.ORDER_ATOMIC)
		//console.log(colour);
		//var rgb = colour.match(/^#(.)\1(.)\2(.)\3$/);
		//var red = 0, green = 0, blue = 0;
		//if (rgb) {
		//	red = Math.floor(parseInt(rgb[1], 16) / 4);
		//	green = Math.floor(parseInt(rgb[2], 16) / 4);
		//	blue = Math.floor(parseInt(rgb[3], 16) / 4);
		//}
		//console.log(red, green, blue);
		//var code = "api.command('rgb', " + red + ", " + green + ", " + blue + ")";


		//var colour = Blockly.Python.valueToCode(block, 'COLOUR', Blockly.Python.ORDER_ATOMIC);
		//var code = "led_colour = " + colour + "\napi.command('rgb', led_colour)\n";

		//return code;
	//};


})();
*/