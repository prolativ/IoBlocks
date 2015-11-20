(function(){

	var Copernicus = Blockly.Copernicus

	function createSensorHandlerCodeGenerator(apiName){
		function codeGenerator(block){
			var signature = "def " + apiName + "_handler(sensor_value):\n";
			var sensorValueAssignment = Copernicus.indentMarker + "sensors['" + apiName + "'] = sensor_value\n";
			var handlerBody;
				if(block){
					handlerBody = Blockly.Python.statementToCode(block, 'REACTION_BLOCK') || "";
				}else{
					handlerBody = "";
				}
			var settingHandler = "api.set_handler('" + apiName + "', " + apiName + "_handler)\n";
			var code = signature + sensorValueAssignment + handlerBody + "\n" + settingHandler;
			return code;
		}

		return codeGenerator;
	}


	function createButtonHandlerCodeGenerator(apiName){
		function codeGenerator(block){
			var signature = "def " + apiName + "_handler(button_state):\n";
			var handlerBody = Blockly.Python.statementToCode(block, 'REACTION_BLOCK') || Blockly.Python.PASS;
			var settingHandler = "api.set_handler('" + apiName + "', " + apiName + "_handler)\n";
			var code = signature + handlerBody + "\n" + settingHandler;
			return code;
		}

		return codeGenerator;
	}


	function createSensorValueGetterCodeGenerator(apiName){
		function codeGenerator(block){
			var code = "sensors['" + apiName + "']"
			return [code, Blockly.Python.ORDER_ATOMIC];
		}

		return codeGenerator;
	}


	for(var i=0; i<Copernicus.sensors.length; ++i){
		var sensor = Copernicus.sensors[i];
		Blockly.Python["copernicus_event_" + sensor.apiName] = createSensorHandlerCodeGenerator(sensor.apiName);
		Blockly.Python["copernicus_get_" + sensor.apiName] = createSensorValueGetterCodeGenerator(sensor.apiName);
	}

	for(var i=0; i<Copernicus.buttons.length; ++i){
		var button = Copernicus.buttons[i];
		Blockly.Python["copernicus_event_" + button.apiName] = createButtonHandlerCodeGenerator(button.apiName);
	}


	Blockly.Python['copernicus_set_servo'] = function(block){
		var position = Blockly.Python.valueToCode(block, 'POSITION', Blockly.Python.ORDER_ATOMIC) || 0;
		var code = "api.command('servo', " + position + ")\n"; //Should position be divided by 2?
		return code;
	};

	Blockly.Python['copernicus_set_led_white'] = function(block) {
		var state;
		switch(block.getFieldValue('LED_STATE')){
			case "LED_TOGGLE": state = 'not led_state'; break;
			case "LED_ON": state = 'True'; break;
			default: state = 'False'
		}
		var code = "led_state = " + state + "\napi.command('led', led_state)\n";
		return code;
	};	
	
	Blockly.Python['copernicus_set_led_colour'] = function(block){
		var colour = Blockly.Python.valueToCode(block, 'COLOUR', Blockly.Python.ORDER_ATOMIC) || "#ffffff";
		var colourDecompositionCode = "red_value, green_value, blue_value = decompose_colour(" + colour + ")\n";
		var commandCode = "api.command('rgb', red_value, green_value, blue_value)\n";

		var code = colourDecompositionCode + commandCode;

		return code;
	};

	Blockly.Python['copernicus_colour_picker'] = function(block) {
	  var code = '\'' + (block.getFieldValue('COLOUR') || "#ffffff") + '\'';
	  return [code, Blockly.Python.ORDER_ATOMIC];
	};

	Blockly.Python['copernicus_event_timer'] = function(block){
		var timerName = block.getFieldValue("TIMER_NAME").slice(6, 7);
		if(timerName == "*"){
			timerName = "always";
		}
		var interval = Blockly.Python.valueToCode(block, 'INTERVAL', Blockly.Python.ORDER_ATOMIC) || '1';
		var intervalTimeUnit = block.getFieldValue("INTERVAL_TIME_UNIT");
		var repetitions = Blockly.Python.valueToCode(block, 'REPETITIONS', Blockly.Python.ORDER_ATOMIC) || '1';
		var delay = Blockly.Python.valueToCode(block, 'DELAY', Blockly.Python.ORDER_ATOMIC) || '0';
		var delayTimeUnit = block.getFieldValue("DELAY_TIME_UNIT");

		var signature = "def timer_" + timerName + "_handler():\n";
		var handlerBody = Blockly.Python.statementToCode(block, 'REACTION_BLOCK') || Blockly.Python.PASS;
		var settingHandler = "timer_" + timerName + " = Timer(" + interval + ", '" + intervalTimeUnit + "', " + repetitions + ", " +
			delay + ", '" + delayTimeUnit + "', timer_" + timerName + "_handler)\n";
		var code = signature + handlerBody + "\n" + settingHandler;

		return code;
	}


	Blockly.Python['copernicus_timer_start'] = function(block){
		var timerName = block.getFieldValue("TIMER_NAME").slice(6,7);
		var code = "timer_" + timerName + ".start()\n"

		return code;
	}

	Blockly.Python['copernicus_timer_stop'] = function(block){
		var timerName = block.getFieldValue("TIMER_NAME").slice(6,7);
		var code = "timer_" + timerName + ".stop()\n"

		return code;
	}

})();
