(function(){
	Blockly.Copernicus = {};

	Blockly.Copernicus.timeUnits = [["seconds", "SECONDS"], ["minutes", "MINUTES"], ["hours", "HOURS"]];

	Blockly.Copernicus.ledStates = [["on", "LED_ON"], ["off", "LED_OFF"], ["toggle", "LED_TOGGLE"]]

	Blockly.Copernicus.rgbColours = [
		["white", "RGB_white"],
		["red", "RGB_RED"],
		["green", "RGB_GREEN"],
		["blue", "RGB_BLUE"],
		["cyan", "RGB_CYAN"],
		["magenta", "RGB_MAGENTA"],
		["yellow", "RGB_YELLOW"],
		["off", "RGB_OFF"]
	]

	Blockly.Copernicus.buttonStates = [["pressed", "BUTTON_DOWN"], ["released", "BUTTON_UP"]];

	Blockly.Copernicus.controllableTimersNames = [["A", "TIMER_A"], ["B", "TIMER_B"], ["C", "TIMER_C"]];
	Blockly.Copernicus.timersNames = Blockly.Copernicus.controllableTimersNames.concat([["*", "TIMER_*"]]);


	Blockly.Copernicus.sensors = [
	    {apiName: "light", fullName: "light", valueType: "Number"},
	    {apiName: "knob", fullName: "knob position", valueType: "Number"},
	    {apiName: "temperature", fullName: "temperature", valueType: "Number"},
	    {apiName: "motion", fullName: "motion", valueType: "Boolean"}
  	];

	Blockly.Copernicus.buttons = [
		{apiName: "button1", fullName: "button 1"},
    	{apiName: "button2", fullName: "button 2"}
	];

	Blockly.Copernicus.indentMarker = "  ";
	
})();