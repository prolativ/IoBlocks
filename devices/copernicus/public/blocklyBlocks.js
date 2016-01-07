define(['device.msg',
        './commons',
        'blockly'], function(msg){

  var Copernicus = Blockly.Copernicus;

  function createSimpleEventBlock(conditionName){
    var blockTitle = msg.eventBlockTitles[conditionName]

    return {
      init: function() {
        this.setColour(Copernicus.eventBlocksColour);
        this.appendDummyInput()
            .appendField(blockTitle);
        this.appendStatementInput("REACTION_BLOCK");
        this.setPreviousStatement(false);
        this.setNextStatement(false);
      }
    };
  }

  function createSensorEventBlock(apiName){
    return createSimpleEventBlock(apiName);
  }

  function createValueGetterBlock(apiName, varName, valueType){
    return {
      init: function() {
        this.setColour(Copernicus.valuesBlocksColour);
        this.appendDummyInput()
            .appendField(msg.valueNames[apiName]);
        this.setOutput(true, valueType);
      },

      getVars: function() {
        return [varName];
      }
    };
  }


  for(var i=0; i<Copernicus.sensors.length; ++i){
    var sensor = Copernicus.sensors[i];
    Blockly.Blocks['copernicus_event_' + sensor.apiName] = createSensorEventBlock(sensor.apiName);
    Blockly.Blocks['copernicus_get_' + sensor.apiName] = createValueGetterBlock(sensor.apiName, sensor.varName, sensor.valueType);
  }

  Blockly.Blocks['copernicus_event_text_input'] = createSimpleEventBlock("text");
  Blockly.Blocks['copernicus_get_text_input'] = createValueGetterBlock("text", "String");


  Blockly.Blocks['copernicus_event_timer'] = {
    init: function() {
      var blockTitleParts = msg.eventBlockTitles.timer;

      this.setColour(Copernicus.eventBlocksColour);
      this.appendDummyInput()
        .appendField(blockTitleParts[0]);
      this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown(Copernicus.timersNames), 'TIMER_NAME');
      this.appendDummyInput()
          .appendField(blockTitleParts[1]);
      this.appendValueInput('INTERVAL')
          .setCheck('Number');
      this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown(Copernicus.timeUnits), 'INTERVAL_TIME_UNIT');
      this.appendDummyInput()
        .appendField(blockTitleParts[2]);
      this.appendValueInput('REPETITIONS')
          .setCheck('Number');
      this.appendDummyInput()
        .appendField(blockTitleParts[3]);
      this.appendValueInput('DELAY')
          .setCheck('Number');
      this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown(Copernicus.timeUnits), 'DELAY_TIME_UNIT');
      this.appendDummyInput()
        .appendField(blockTitleParts[4]);
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
        .appendField(msg.actionBlockTitles["timerStart"]);
      this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown(Copernicus.controllableTimersNames), 'TIMER_NAME');
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setInputsInline(true);
    },

    getVars: function() {
      return [this.getFieldValue('TIMER_NAME')];
    }
  };


  Blockly.Blocks['copernicus_timer_stop'] = {
    init: function() {
      this.setColour(Copernicus.actionBlocksColour);
      this.appendDummyInput()
      	.appendField(msg.actionBlockTitles["timerStop"]);
      this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown(Copernicus.controllableTimersNames), 'TIMER_NAME');
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setInputsInline(true);
    },

    getVars: function() {
      return [this.getFieldValue('TIMER_NAME')];
    }
  };
   
      
  Blockly.Blocks['copernicus_set_servo'] = {
    init: function() {
      this.setColour(Copernicus.actionBlocksColour);
      this.appendValueInput("POSITION")
      	.appendField(msg.actionBlockTitles["servo"]);
      this.setPreviousStatement(true);
      this.setNextStatement(true);
    }
  };


  Blockly.Blocks['copernicus_set_led_white'] = {
    init: function() {
      this.setColour(Copernicus.actionBlocksColour);
      this.appendValueInput("LED_STATE")
        .appendField(msg.actionBlockTitles["led"])
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
      	.appendField(msg.actionBlockTitles["rgb"])
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
