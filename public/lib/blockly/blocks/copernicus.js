//var definedReactions = ['react_light', 'react_button1'];

var definedReactions = [];

var timeUnits = [['seconds', 'SECONDS'], ['minutes', 'MINUTES'], ['hours', 'HOURS']];

function getDefinedReactions(){
	var options = [];
	for (var i = 0; i < definedReactions.length; ++i) {
    	options.push([definedReactions[i], 'REACTION' + i]);
	}
	return options;
}

var copernicus_peripherals = [["light", "LIGHT"], ["knob position", "KNOB_POSITION"], ["temperature", "TEMPERATURE"], ["motion", "MOTION"], ["button 1", "BUTTON1"], ["button 2", "BUTTON2"]];

Blockly.Blocks['copernicus_event'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(330);
    this.appendDummyInput()
        .appendField("event name:")
        .appendField(new Blockly.FieldTextInput("new reaction"), "REACTION_NAME");
    this.appendDummyInput()
        .appendField("when")
        .appendField(new Blockly.FieldDropdown(copernicus_peripherals), "EVENT")
        .appendField("changes from")
        .appendField(new Blockly.FieldVariable("oldValue"), "OLD_VAR")
        .appendField("to")
        .appendField(new Blockly.FieldVariable("newValue"), "NEW_VAR");
    this.appendStatementInput("EVENT_BLOCK");
    this.setTooltip('');
  },
  
  getVars: function() {
    return [this.getFieldValue('OLD_VAR'), this.getFieldValue('NEW_VAR')];
  },
  renameVar: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getFieldValue('OLD_VAR'))) {
      this.setFieldValue(newName, 'OLD_VAR');
    }else if (Blockly.Names.equals(oldName, this.getFieldValue('NEW_VAR'))) {
      this.setFieldValue(newName, 'NEW_VAR');
    }
  },
  customContextMenu: Blockly.Blocks['variables_get'].customContextMenu
};


Blockly.Blocks['copernicus_event_light'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(330);
    this.appendDummyInput()
        .appendField("when light changes from")
        .appendField(new Blockly.FieldVariable("oldValue"), "OLD_VAR")
        .appendField("to")
        .appendField(new Blockly.FieldVariable("newValue"), "NEW_VAR");
    this.appendStatementInput("EVENT_BLOCK");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setInputsInline(true);
    this.setTooltip('');
  },
  
  getVars: function() {
    return [this.getFieldValue('OLD_VAR'), this.getFieldValue('NEW_VAR')];
  },
  renameVar: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getFieldValue('OLD_VAR'))) {
      this.setFieldValue(newName, 'OLD_VAR');
    }else if (Blockly.Names.equals(oldName, this.getFieldValue('NEW_VAR'))) {
      this.setFieldValue(newName, 'NEW_VAR');
    }
  },
  customContextMenu: Blockly.Blocks['variables_get'].customContextMenu
};



Blockly.Blocks['copernicus_event_temperature'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(330);
    this.appendDummyInput()
        .appendField("when temperature changes from")
        .appendField(new Blockly.FieldVariable("oldValue"), "OLD_VAR")
        .appendField("to")
        .appendField(new Blockly.FieldVariable("newValue"), "NEW_VAR");
    this.appendStatementInput("EVENT_BLOCK");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setInputsInline(true);
    this.setTooltip('');
  },
  
  getVars: function() {
    return [this.getFieldValue('OLD_VAR'), this.getFieldValue('NEW_VAR')];
  },
  renameVar: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getFieldValue('OLD_VAR'))) {
      this.setFieldValue(newName, 'OLD_VAR');
    }else if (Blockly.Names.equals(oldName, this.getFieldValue('NEW_VAR'))) {
      this.setFieldValue(newName, 'NEW_VAR');
    }
  },
  customContextMenu: Blockly.Blocks['variables_get'].customContextMenu
};



Blockly.Blocks['copernicus_event_knob'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(330);
    this.appendDummyInput()
        .appendField("when knob position changes from")
        .appendField(new Blockly.FieldVariable("oldValue"), "OLD_VAR")
        .appendField("to")
        .appendField(new Blockly.FieldVariable("newValue"), "NEW_VAR");
    this.appendStatementInput("EVENT_BLOCK");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setInputsInline(true);
    this.setTooltip('');
  },
  
  getVars: function() {
    return [this.getFieldValue('OLD_VAR'), this.getFieldValue('NEW_VAR')];
  },
  renameVar: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getFieldValue('OLD_VAR'))) {
      this.setFieldValue(newName, 'OLD_VAR');
    }else if (Blockly.Names.equals(oldName, this.getFieldValue('NEW_VAR'))) {
      this.setFieldValue(newName, 'NEW_VAR');
    }
  },
  customContextMenu: Blockly.Blocks['variables_get'].customContextMenu
};



Blockly.Blocks['copernicus_event_motion'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(330);
    this.appendDummyInput()
        .appendField("when motion detected");
    this.appendStatementInput("EVENT_BLOCK");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setInputsInline(true);
    this.setTooltip('');
  }
};


Blockly.Blocks['copernicus_event_button1'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(330);
    this.appendDummyInput()
        .appendField("when button 1")
        .appendField(new Blockly.FieldDropdown([["pressed", "BUTTON_DOWN"], ["released", "BUTTON_UP"]]), "BUTTON_STATE");
    this.appendStatementInput("EVENT_BLOCK");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setInputsInline(true);
    this.setTooltip('');
  }
};



Blockly.Blocks['copernicus_event_button2'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(330);
    this.appendDummyInput()
        .appendField("when button 2")
        .appendField(new Blockly.FieldDropdown([["pressed", "BUTTON_DOWN"], ["released", "BUTTON_UP"]]), "BUTTON_STATE");
    this.appendStatementInput("EVENT_BLOCK");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setInputsInline(true);
    this.setTooltip('');
  }
};


Blockly.Blocks['copernicus_timer_set'] = {
  init: function() {
    this.setHelpUrl(Blockly.Msg.MATH_ARITHMETIC_HELPURL);
    this.setColour(Blockly.Blocks.math.HUE);
    this.appendDummyInput()
    	.appendField("set timer every");
    this.appendValueInput('TIME_VALUE')
        .setCheck('Number');
   	this.appendDummyInput()
    	.appendField(new Blockly.FieldDropdown(timeUnits), 'TIME_UNIT');
    this.appendStatementInput("EVENT_BLOCK");
   	this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setInputsInline(true);
  }
};


Blockly.Blocks['copernicus_timer_stop'] = {
  init: function() {
    this.setHelpUrl(Blockly.Msg.MATH_ARITHMETIC_HELPURL);
    this.setColour(Blockly.Blocks.math.HUE);
    this.appendDummyInput()
    	.appendField("stop timer");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};



/*  
  getVars: function() {
    return [this.getFieldValue('OLD_VAR'), this.getFieldValue('NEW_VAR')];
  },
  renameVar: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getFieldValue('OLD_VAR'))) {
      this.setFieldValue(newName, 'OLD_VAR');
    }else if (Blockly.Names.equals(oldName, this.getFieldValue('NEW_VAR'))) {
      this.setFieldValue(newName, 'NEW_VAR');
    }
  },
  customContextMenu: Blockly.Blocks['variables_get'].customContextMenu
};*/

/*
Blockly.Blocks['copernicus_event_time'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(330);
    this.appendDummyInput()
        .appendField("when button 2 released");
    this.appendStatementInput("EVENT_BLOCK");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setInputsInline(true);
    this.setTooltip('');
  }
};*/

/*
Blockly.Blocks['copernicus_react'] = {
	init: function() {
	    this.setHelpUrl('http://www.example.com/');
	    this.setColour(65);
	    this.appendDummyInput()
	        .appendField("react to")
	        .appendField(new Blockly.FieldDropdown(copernicus_peripherals), "EVENT")
	        .appendField("with")
	        .appendField(new Blockly.FieldDropdown(getDefinedReactions), "REACTION");
	    this.setPreviousStatement(true);
	    this.setNextStatement(true);
	    this.setTooltip('');
	}
};*/


Blockly.Blocks['copernicus_react'] = {
	init: function() {
	    this.setHelpUrl('http://www.example.com/');
	    this.setColour(65);
	    this.appendDummyInput()
	        .appendField("react to")
	        .appendField(new Blockly.FieldDropdown(copernicus_peripherals), "EVENT")
	        .appendField("with")
	        .appendField(new Blockly.FieldDropdown(getDefinedReactions), "REACTION");
	    this.setPreviousStatement(true);
	    this.setNextStatement(true);
	    this.setTooltip('');
	}
};
    
    
    
Blockly.Blocks['copernicus_set_servo'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(210);
    this.appendValueInput("NAME")
    	.appendField("set servo position to");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};


Blockly.Blocks['copernicus_set_led_white'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(210);
    this.appendDummyInput()
        .appendField("set white led")
        .appendField(new Blockly.FieldDropdown([["on", "LED_ON"], ["off", "LED_OFF"]]), "LED_STATE");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['copernicus_set_led_colour'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(210);
    this.appendDummyInput("COLOUR")
    	.appendField("set colour led")
        .appendField(new Blockly.FieldColour("#ff0000"), "COLOUR_FIELD");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

