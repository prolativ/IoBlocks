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
    ["off", "RGB_OFF"]
  ]

  var buttonStates = [["pressed", "BUTTON_DOWN"], ["released", "BUTTON_UP"]];

  var controllableTimersNames = [["A", "TIMER_A"], ["B", "TIMER_B"], ["C", "TIMER_C"]];
  var timersNames = controllableTimersNames.concat([["*", "TIMER_*"]]);

  // var sensors = [["light", "LIGHT"], ["knob", "KNOB_POSITION"], ["temperature", "TEMPERATURE"], ["motion", "MOTION"];
  var sensorNames = [["light", "light"], ["knob", "knob position"], ["temperature", "temperature"], ["motion", "motion"]];
  var buttonNames = [["button1", "button 1"], ["button2", "button 2"]];


  function createSensorEventBlock(apiName, fullName){
    return {
      init: function() {
        //this.setHelpUrl('http://www.example.com/');
        this.setColour(330);
        this.appendDummyInput()
            .appendField("when " + fullName + " changes")
        this.appendStatementInput("REACTION_BLOCK");
        this.setPreviousStatement(false);
        this.setNextStatement(false);
        this.setInputsInline(true);
        //this.setTooltip('');
      },
      
      getVars: function() {
        return [apiName];
      },

      customContextMenu: Blockly.Blocks['variables_get'].customContextMenu
    };
  }

  function createButtonEventBlock(apiName, fullName){
    return {
      init: function() {
        //this.setHelpUrl('http://www.example.com/');
        this.setColour(330);
        this.appendDummyInput()
            .appendField("when " + fullName)
            .appendField(new Blockly.FieldDropdown(buttonStates), "BUTTON_STATE");
        this.appendStatementInput("REACTION_BLOCK");
        this.setPreviousStatement(false);
        this.setNextStatement(false);
        this.setInputsInline(true);
        this.setTooltip('');
      }
    };
  }

  Blockly.Blocks['copernicus_event_button1'] = {
    init: function() {
      //this.setHelpUrl('http://www.example.com/');
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

  for(var i=0; i<sensorNames.length; ++i){
    var apiName = sensorNames[i][0];
    var fullName = sensorNames[i][1];
    Blockly.Blocks['copernicus_event_' + apiName] = createSensorEventBlock(apiName, fullName);
  }

  for(var i=0; i<buttonNames.length; ++i){
    var apiName = buttonNames[i][0];
    var fullName = buttonNames[i][1];
    Blockly.Blocks['copernicus_event_' + apiName] = createButtonEventBlock(apiName, fullName);
  }

  /*
  var copernicus_peripherals = [["light", "LIGHT"], ["knob position", "KNOB_POSITION"], ["temperature", "TEMPERATURE"], ["motion", "MOTION"], ["button 1", "BUTTON1"], ["button 2", "BUTTON2"]];

  Blockly.Blocks['copernicus_event'] = {
    init: function() {
      //this.setHelpUrl('http://www.example.com/');
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


  /*
  Blockly.Blocks['copernicus_start'] = {
    init: function() {
      //this.setHelpUrl('http://www.example.com/');
      this.setColour(330);
      this.appendDummyInput()
          .appendField("device start");
      this.setPreviousStatement(false);
      this.setNextStatement(true);
      this.setTooltip('');
    }
  };*/


/*
  Blockly.Blocks['copernicus_event_light'] = {
    init: function() {
      //this.setHelpUrl('http://www.example.com/');
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
      //this.setHelpUrl('http://www.example.com/');
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
      //this.setHelpUrl('http://www.example.com/');
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
      //this.setHelpUrl('http://www.example.com/');
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
      //this.setHelpUrl('http://www.example.com/');
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
      //this.setHelpUrl('http://www.example.com/');
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

*/


/*

  Blockly.Blocks['copernicus_timer_once'] = {
    init: function() {
      //this.setHelpUrl(Blockly.Msg.MATH_ARITHMETIC_HELPURL);
      this.setColour(Blockly.Blocks.math.HUE);
      this.appendDummyInput()
        .appendField("once after");
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


  Blockly.Blocks['copernicus_timer_always'] = {
    init: function() {
      //this.setHelpUrl(Blockly.Msg.MATH_ARITHMETIC_HELPURL);
      this.setColour(Blockly.Blocks.math.HUE);
      this.appendDummyInput()
      	.appendField("always after each");
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



  Blockly.Blocks['copernicus_timer_times'] = {
    init: function() {
      //this.setHelpUrl(Blockly.Msg.MATH_ARITHMETIC_HELPURL);
      this.setColour(Blockly.Blocks.math.HUE);
      this.appendValueInput('REPETITIONS')
          .setCheck('Number');
      this.appendDummyInput()
          .appendField("times after each");
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



  Blockly.Blocks['copernicus_timer_while'] = {
    init: function() {
      //this.setHelpUrl(Blockly.Msg.MATH_ARITHMETIC_HELPURL);
      this.setColour(Blockly.Blocks.math.HUE);
      this.appendDummyInput()
        .appendField("while");
      this.appendValueInput('CONDITION')
          .setCheck('Boolean');
      this.appendDummyInput()
          .appendField("after each");
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

  */


  Blockly.Blocks['copernicus_event_timer'] = {
    init: function() {
      //this.setHelpUrl(Blockly.Msg.MATH_ARITHMETIC_HELPURL);
      this.setColour(Blockly.Blocks.math.HUE);
      this.appendDummyInput()
        .appendField("set timer");
      this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown(timersNames), 'TIMER_NAME');
      this.appendDummyInput()
          .appendField("each");
      this.appendValueInput('INTERVAL')
          .setCheck('Number');
      this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown(timeUnits), 'INTERVAL_TIME_UNIT');
      this.appendDummyInput()
        .appendField("for");
      this.appendValueInput('REPETITIONS')
          .setCheck('Number');
      this.appendDummyInput()
        .appendField("times delayed");
      this.appendValueInput('DELAY')
          .setCheck('Number');
      this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown(timeUnits), 'DELAY_TIME_UNIT');
      this.appendStatementInput("REACTION_BLOCK");
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setInputsInline(true);
    }
  };


  Blockly.Blocks['copernicus_timer_start'] = {
    init: function() {
      //this.setHelpUrl(Blockly.Msg.MATH_ARITHMETIC_HELPURL);
      this.setColour(Blockly.Blocks.math.HUE);
      this.appendDummyInput()
        .appendField("stop timer");
      this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown(controllableTimersNames), 'TIMER_NAME');
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setInputsInline(true);
    }
  };


  Blockly.Blocks['copernicus_timer_stop'] = {
    init: function() {
      //this.setHelpUrl(Blockly.Msg.MATH_ARITHMETIC_HELPURL);
      this.setColour(Blockly.Blocks.math.HUE);
      this.appendDummyInput()
      	.appendField("stop timer");
      this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown(controllableTimersNames), 'TIMER_NAME');
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setInputsInline(true);
    }
  };


      
      
      
  Blockly.Blocks['copernicus_set_servo'] = {
    init: function() {
      //this.setHelpUrl('http://www.example.com/');
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
      //this.setHelpUrl('http://www.example.com/');
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
      //this.setHelpUrl('http://www.example.com/');
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
      //this.setHelpUrl('http://www.example.com/');
      this.setColour(210);
      this.appendDummyInput()
          .appendField(new Blockly.FieldColour('#ff0000'), 'COLOUR');
      this.setOutput(true, 'Colour');
      this.setTooltip(Blockly.Msg.COLOUR_PICKER_TOOLTIP);
    }
    */

    init: function() {
      //this.setHelpUrl('http://www.example.com/');
      this.setColour(210);
      this.appendDummyInput()
          .appendField(new Blockly.FieldDropdown(rgbColours), 'COLOUR');
      this.setOutput(true, 'CopernicusColour');
      this.setTooltip(Blockly.Msg.COLOUR_PICKER_TOOLTIP);
    }
  };

})();
