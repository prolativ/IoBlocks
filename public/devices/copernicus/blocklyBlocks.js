define(['./commons',
          'blockly'], function(){

  var Copernicus = Blockly.Copernicus;

  function createSensorEventBlock(fullName){
    return {
      init: function() {
        this.setColour(330);
        this.appendDummyInput()
            .appendField("when " + fullName + " changes")
        this.appendStatementInput("REACTION_BLOCK");
        this.setPreviousStatement(false);
        this.setNextStatement(false);
        this.setInputsInline(true);
      }
    };
  }

  function createSensorValueGetterBlock(fullName, valueType){
    return {
      init: function() {
        this.setColour(330);
        this.appendDummyInput()
            .appendField(fullName)
        this.setOutput(true, valueType);
      }
    };
  }


  for(var i=0; i<Copernicus.sensors.length; ++i){
    var sensor = Copernicus.sensors[i];
    Blockly.Blocks['copernicus_event_' + sensor.apiName] = createSensorEventBlock(sensor.fullName);
    Blockly.Blocks['copernicus_get_' + sensor.apiName] = createSensorValueGetterBlock(sensor.fullName, sensor.valueType);
  }

  Blockly.Blocks['copernicus'] = {
    //Block automatically added to workspace to force code insertion
  };


  Blockly.Blocks['copernicus_event_timer'] = {
    init: function() {
      this.setColour(Blockly.Blocks.math.HUE);
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
      this.setColour(Blockly.Blocks.math.HUE);
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
      this.setColour(Blockly.Blocks.math.HUE);
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
      this.setColour(210);
      this.appendValueInput("POSITION")
      	.appendField("set servo position to");
      this.setPreviousStatement(true);
      this.setNextStatement(true);
    }
  };


  Blockly.Blocks['copernicus_set_led_white'] = {
    init: function() {
      this.setColour(210);
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
      this.setColour(210);
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
      this.setColour(210);
      this.appendDummyInput()
          .appendField(Blockly.Copernicus.newFieldColour(), 'COLOUR');
      this.setOutput(true, 'Colour');
      this.setTooltip(Blockly.Msg.COLOUR_PICKER_TOOLTIP);
    }
  };

});
