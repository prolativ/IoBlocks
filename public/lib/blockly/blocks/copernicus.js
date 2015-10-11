(function(){

  var timeUnits = [["seconds", "SECONDS"], ["minutes", "MINUTES"], ["hours", "HOURS"]];

  var ledStates = [["on", "LED_ON"], ["off", "LED_OFF"], ["toggle", "LED_TOGGLE"]]

  var rgbColours = [
    ["white", "RGB_white"],
    ["red", "RGB_RED"],
    ["green", "RGB_GREEN"],
    ["blue", "RGB_BLUE"],
    ["cyan", "RGB_CYAN"],
    ["magenta", "RGB_MAGENTA"],
    ["yellow", "RGB_YELLOW"],
    ["off", "RGB_OFF"],
  ]

  var buttonStates = [["pressed", "BUTTON_DOWN"], ["released", "BUTTON_UP"]];


  /*
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
      this.appendStatementInput("REACTION_BLOCK");
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
  */

  Blockly.Blocks['copernicus_start'] = {
    init: function() {
      this.setHelpUrl('http://www.example.com/');
      this.setColour(330);
      this.appendDummyInput()
          .appendField("device start");
      this.setPreviousStatement(false);
      this.setNextStatement(true);
      this.setTooltip('');
    }
  };


  Blockly.Blocks['copernicus_event_light'] = {
    init: function() {
      this.setHelpUrl('http://www.example.com/');
      this.setColour(330);
      this.appendDummyInput()
          .appendField("when light changes from")
          .appendField(new Blockly.FieldVariable("old_light"), "OLD_VAR")
          .appendField("to")
          .appendField(new Blockly.FieldVariable("new_light"), "NEW_VAR");
      this.appendStatementInput("REACTION_BLOCK");
      this.setPreviousStatement(false);
      this.setNextStatement(false);
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
          .appendField(new Blockly.FieldVariable("old_temp"), "OLD_VAR")
          .appendField("to")
          .appendField(new Blockly.FieldVariable("new_temp"), "NEW_VAR");
      this.appendStatementInput("REACTION_BLOCK");
      this.setPreviousStatement(false);
      this.setNextStatement(false);
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
          .appendField(new Blockly.FieldVariable("old_knob_pos"), "OLD_VAR")
          .appendField("to")
          .appendField(new Blockly.FieldVariable("new_knob_pos"), "NEW_VAR");
      this.appendStatementInput("REACTION_BLOCK");
      this.setPreviousStatement(false);
      this.setNextStatement(false);
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
      this.appendStatementInput("REACTION_BLOCK");
      this.setPreviousStatement(false);
      this.setNextStatement(false);
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
          .appendField(new Blockly.FieldDropdown(buttonStates), "BUTTON_STATE");
      this.appendStatementInput("REACTION_BLOCK");
      this.setPreviousStatement(false);
      this.setNextStatement(false);
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
          .appendField(new Blockly.FieldDropdown(buttonStates), "BUTTON_STATE");
      this.appendStatementInput("REACTION_BLOCK");
      this.setPreviousStatement(false);
      this.setNextStatement(false);
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
      this.appendStatementInput("REACTION_BLOCK");
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
  Blockly.Blocks['copernicus_event_time'] = {
    init: function() {
      this.setHelpUrl('http://www.example.com/');
      this.setColour(330);
      this.appendDummyInput()
          .appendField("when button 2 released");
      this.appendStatementInput("REACTION_BLOCK");
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
  };
  */
      
      
      
  Blockly.Blocks['copernicus_set_servo'] = {
    init: function() {
      this.setHelpUrl('http://www.example.com/');
      this.setColour(210);
      this.appendValueInput("POSITION")
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
          .appendField(new Blockly.FieldDropdown(ledStates), "LED_STATE");
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setTooltip('');
    }
  };

  Blockly.Blocks['copernicus_set_led_colour'] = {
    init: function() {
      this.setHelpUrl('http://www.example.com/');
      this.setColour(210);
      this.appendValueInput("COLOUR")
      	.appendField("set colour led")
        .setCheck('CopernicusColour')
        .setAlign(Blockly.ALIGN_RIGHT)
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setTooltip('');
    }
  };

  Blockly.Blocks['copernicus_colour_picker'] = {
    /*
    init: function() {
      this.setHelpUrl('http://www.example.com/');
      this.setColour(210);
      this.appendDummyInput()
          .appendField(new Blockly.FieldColour('#ff0000'), 'COLOUR');
      this.setOutput(true, 'Colour');
      this.setTooltip(Blockly.Msg.COLOUR_PICKER_TOOLTIP);
    }
    */

    init: function() {
      this.setHelpUrl('http://www.example.com/');
      this.setColour(210);
      this.appendDummyInput()
          .appendField(new Blockly.FieldDropdown(rgbColours), 'COLOUR');
      this.setOutput(true, 'CopernicusColour');
      this.setTooltip(Blockly.Msg.COLOUR_PICKER_TOOLTIP);
    }
  };

})();
