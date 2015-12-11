define(['./commons',
          'blockly'], function(){

  var Copernicus = Blockly.Copernicus;

  function createSimpleEventBlock(conditionName){
    return {
      init: function() {
        this.setColour(Copernicus.eventBlocksColour);
        this.appendDummyInput()
            .appendField(conditionName)
        this.appendStatementInput("REACTION_BLOCK");
        this.setPreviousStatement(false);
        this.setNextStatement(false);
      }
    };
  }

  function createSensorEventBlock(eventName){
    return createSimpleEventBlock("when " + eventName + " changes");
  }

  function createValueGetterBlock(valueName, valueType){
    return {
      init: function() {
        this.setColour(Copernicus.valuesBlocksColour);
        this.appendDummyInput()
            .appendField(valueName)
        this.setOutput(true, valueType);
      }
    };
  }


  for(var i=0; i<Copernicus.sensors.length; ++i){
    var sensor = Copernicus.sensors[i];
    Blockly.Blocks['copernicus_event_' + sensor.apiName] = createSensorEventBlock(sensor.fullName);
    Blockly.Blocks['copernicus_get_' + sensor.apiName] = createValueGetterBlock(sensor.fullName, sensor.valueType);
  }

  Blockly.Blocks['copernicus_event_text_input'] = createSimpleEventBlock("when text gets inserted");
  Blockly.Blocks['copernicus_get_text_input'] = createValueGetterBlock("inserted text", "String");


  Blockly.Blocks['copernicus_event_timer'] = {
    init: function() {
      this.setColour(Copernicus.eventBlocksColour);
      this.appendDummyInput()
        .appendField("set timer");
      this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown(Copernicus.timersNames), 'TIMER_NAME');
      this.appendDummyInput()
          .appendField("each");
      this.appendValueInput('INTERVAL')
          .setCheck('Number');
      this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown(Copernicus.timeUnits), 'INTERVAL_TIME_UNIT');
      this.appendDummyInput()
        .appendField("for");
      this.appendValueInput('REPETITIONS')
          .setCheck('Number');
      this.appendDummyInput()
        .appendField("times delayed");
      this.appendValueInput('DELAY')
          .setCheck('Number');
      this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown(Copernicus.timeUnits), 'DELAY_TIME_UNIT');
      this.appendStatementInput("REACTION_BLOCK");
      this.setPreviousStatement(false);
      this.setNextStatement(false);
      this.setInputsInline(true);
    }
  };

  Blockly.Blocks['copernicus_timer_start'] = {
    init: function() {
      this.setColour(Copernicus.actionBlocksColour);
      this.appendDummyInput()
        .appendField("start timer");
      this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown(Copernicus.controllableTimersNames), 'TIMER_NAME');
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setInputsInline(true);
    }
  };


  Blockly.Blocks['copernicus_timer_stop'] = {
    init: function() {
      this.setColour(Copernicus.actionBlocksColour);
      this.appendDummyInput()
      	.appendField("stop timer");
      this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown(Copernicus.controllableTimersNames), 'TIMER_NAME');
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setInputsInline(true);
    }
  };
   
      
  Blockly.Blocks['copernicus_set_servo'] = {
    init: function() {
      this.setColour(Copernicus.actionBlocksColour);
      this.appendValueInput("POSITION")
      	.appendField("set servo position to");
      this.setPreviousStatement(true);
      this.setNextStatement(true);
    }
  };


  Blockly.Blocks['copernicus_set_led_white'] = {
    init: function() {
      this.setColour(Copernicus.actionBlocksColour);
      this.appendValueInput("LED_STATE")
        .appendField("set white led turned on")
        .setCheck('Boolean')
        .setAlign(Blockly.ALIGN_RIGHT);
      this.setPreviousStatement(true);
      this.setNextStatement(true);
    }
  };

  Blockly.Blocks['copernicus_set_led_colour'] = {
    init: function() {
      this.setColour(Copernicus.actionBlocksColour);
      this.appendValueInput("COLOUR")
      	.appendField("set colour led")
        .setCheck('Colour')
        .setAlign(Blockly.ALIGN_RIGHT);
      this.setPreviousStatement(true);
      this.setNextStatement(true);
    }
  };

  Blockly.Blocks['copernicus_colour_picker'] = {
    init: function() {
      this.setColour(Copernicus.valuesBlocksColour);
      this.appendDummyInput()
          .appendField(Blockly.Copernicus.newFieldColour(), 'COLOUR');
      this.setOutput(true, 'Colour');
      this.setTooltip(Blockly.Msg.COLOUR_PICKER_TOOLTIP);
    }
  };


  Blockly.Blocks['copernicus'] = {
    //Block automatically added to workspace to force code insertion - has no graphical representation
  };

});
