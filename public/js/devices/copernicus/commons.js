(function(){
	Blockly.Copernicus = {};

	Blockly.Copernicus.timeUnits = [["milliseconds", "ms"], ["seconds", "s"], ["minutes", "m"], ["hours", "h"]];

	Blockly.Copernicus.ledStates = [["on", "LED_ON"], ["off", "LED_OFF"], ["toggle", "LED_TOGGLE"]]

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

	Blockly.Copernicus.colours = (function(){
		var colours = [];
		//get 4^3 colours as hexadecimal strings
		for(var r = 0; r < 256; r += 85){
			var rStr = ("0" + r.toString(16)).slice(-2);
			for(var g = 0; g < 256; g += 85){
				var gStr = ("0" + g.toString(16)).slice(-2);
				for(var b = 0; b < 256; b += 85){
					var bStr = ("0" + b.toString(16)).slice(-2);
					colours.push("#" + rStr + gStr + bStr);
				}
			}
		}
		return colours;
	})();

	Blockly.Copernicus.newFieldColour = function(){
		var fieldColour = new Blockly.FieldColour();
		fieldColour.setColours(Blockly.Copernicus.colours);
		fieldColour.setColumns(8);
		return fieldColour;
	};
	
})();