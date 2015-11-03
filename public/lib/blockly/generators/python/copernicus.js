(function(){

	function handlerCodeGenerator(eventName){
		function codeGenerator(block){
			var signature = "def " + eventName + "_handler():";
			var handlerBody = Blockly.Python.statementToCode(block, 'REACTION_BLOCK') || Blockly.Python.PASS;
			var settingHandler = "api.set_handler('" + eventName + "', " + eventName + "_handler)"
			var code = signature + "\n" + handlerBody + "\n" + settingHandler;
			return [code, Blockly.Python.ORDER_NONE];
		}

		return codeGenerator;
	};

	Blockly.Python['copernicus_set_servo'] = function(block){
		var position = Blockly.Python.valueToCode(block, 'POSITION', Blockly.Python.ORDER_ATOMIC) || 0;
		var code = "servo_postion = " + position + "\napi.command('servo', servo_position)\n" //Should position be divided by 2?
		return [code, Blockly.Python.ORDER_NONE];
	};

	Blockly.Python['copernicus_set_led_white'] = function(block) {
		var state;
		switch(block.getFieldValue('LED_STATE')){
			case "LED_TOGGLE": state = '!led_state'; break;
			case "LED_ON": state = 'True'; break;
			default: state = 'False'
		}
		var code = "led_state = " + state + "\napi.command('led', led_state)\n";
		return [code, Blockly.Python.ORDER_NONE];
	};	
	
	Blockly.Python['copernicus_set_led_colour'] = function(block){
		/*var colour = Blockly.Python.valueToCode(block, 'COLOUR', Blockly.Python.ORDER_ATOMIC)
		console.log(colour);
		var rgb = colour.match(/^#(.)\1(.)\2(.)\3$/);
		var red = 0, green = 0, blue = 0;
		if (rgb) {
			red = Math.floor(parseInt(rgb[1], 16) / 4);
			green = Math.floor(parseInt(rgb[2], 16) / 4);
			blue = Math.floor(parseInt(rgb[3], 16) / 4);
		}
		console.log(red, green, blue);

		var code = "api.command('rgb', " + red + ", " + green + ", " + blue + ")";*/


		var colour = Blockly.Python.valueToCode(block, 'COLOUR', Blockly.Python.ORDER_ATOMIC);
		var code = "led_colour = " + colour + "\napi.command('rgb', led_colour)\n";

		return [code, Blockly.Python.ORDER_NONE];
	};



	Blockly.Python['copernicus_event_light'] = handlerCodeGenerator('light');

	Blockly.Python['copernicus_event_temperature'] = handlerCodeGenerator('temperature');

	Blockly.Python['copernicus_event_knob'] = handlerCodeGenerator('knob');

	Blockly.Python['copernicus_event_button1'] = handlerCodeGenerator('button1');

	Blockly.Python['copernicus_event_button2'] = handlerCodeGenerator('button2');

	Blockly.Python['copernicus_event_motion'] = handlerCodeGenerator('motion');

	/*
	Blockly.Python['copernicus_timer_set'] = function(block){
		return [code, Blockly.Python.ORDER_NONE];
	}

	Blockly.Python['copernicus_timer_stop'] = function(block){
		return [code, Blockly.Python.ORDER_NONE];
	}
	*/

})();
