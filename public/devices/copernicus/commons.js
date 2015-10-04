define(['blockly'], function(){
	Blockly.Copernicus = {};

	Blockly.Copernicus.timeUnits = [["milliseconds", "ms"], ["seconds", "s"], ["minutes", "m"], ["hours", "h"]];

	Blockly.Copernicus.controllableTimersNames = [["A", "TIMER_A"], ["B", "TIMER_B"], ["C", "TIMER_C"]];
	Blockly.Copernicus.timersNames = Blockly.Copernicus.controllableTimersNames.concat([["*", "TIMER_*"]]);


	Blockly.Copernicus.sensors = [
	    {apiName: "light", varName: "light", fullName: "light", valueType: "Number"},
	    {apiName: "knob", varName: "knob_position", fullName: "knob position", valueType: "Number"},
	    {apiName: "temperature", varName: "temperature", fullName: "temperature", valueType: "Number"},
	    {apiName: "motion", varName: "is_motion_detected", fullName: "motion", valueType: "Boolean"},
	    {apiName: "button1", varName: "is_button1_pressed", fullName: "button 1 state", valueType: "Boolean"},
	    {apiName: "button2", varName: "is_button2_pressed", fullName: "button 2 state", valueType: "Boolean"}
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
	
});