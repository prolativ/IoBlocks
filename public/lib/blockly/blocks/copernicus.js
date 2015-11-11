/*
(function(){

  Blockly.Copernicus = {};
  var Copernicus = Blockly.Copernicus;

  Copernicus.timeUnits = [["seconds", "SECONDS"], ["minutes", "MINUTES"], ["hours", "HOURS"]];

  Copernicus.ledStates = [["on", "LED_ON"], ["off", "LED_OFF"], ["toggle", "LED_TOGGLE"]]

  Copernicus.rgbColours = [
    ["white", "RGB_white"],
    ["red", "RGB_RED"],
    ["green", "RGB_GREEN"],
    ["blue", "RGB_BLUE"],
    ["cyan", "RGB_CYAN"],
    ["magenta", "RGB_MAGENTA"],
    ["yellow", "RGB_YELLOW"],
    ["off", "RGB_OFF"]
  ]

  Copernicus.buttonStates = [["pressed", "BUTTON_DOWN"], ["released", "BUTTON_UP"]];

  Copernicus.controllableTimersNames = [["A", "TIMER_A"], ["B", "TIMER_B"], ["C", "TIMER_C"]];
  Copernicus.timersNames = Copernicus.controllableTimersNames.concat([["*", "TIMER_*"]]);


  Copernicus.sensors = [
    {apiName: "light", fullName: "light", valueType: "Number"},
    {apiName: "knob", fullName: "knob position", valueType: "Number"},
    {apiName: "temperature", fullName: "temperature", valueType: "Number"},
    {apiName: "motion", fullName: "motion", valueType: "Boolean"}
  ];

  Copernicus.buttons = [
    {apiName: "button1", fullName: "button 1"},
    {apiName: "button2", fullName: "button 2"}
  ];

  //Copernicus.sensorNames = [["light", "light"], ["knob", "knob position"], ["temperature", "temperature"], ["motion", "motion"]];
  //Copernicus.buttonNames = [["button1", "button 1"], ["button2", "button 2"]];


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

  function createButtonEventBlock(fullName){
    return {
      init: function() {
        this.setColour(330);
        this.appendDummyInput()
            .appendField("when " + fullName)
            .appendField(new Blockly.FieldDropdown(buttonStates), "BUTTON_STATE");
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
    Blockly.Blocks['copernicus_value_' + sensor.apiName] = createSensorValueGetterBlock(sensor.fullName);
  }

  for(var i=0; i<Copernicus.buttons.length; ++i){
    var button = Copernicus.buttons[i]
    Blockly.Blocks['copernicus_event_' + button.apiName] = createButtonEventBlock(button.fullName, button.valueType);
  }


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
      this.setPreviousStatement(true);
      this.setNextStatement(true);
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
      this.appendDummyInput()
          .appendField("set white led")
          .appendField(new Blockly.FieldDropdown(Copernicus.ledStates), "LED_STATE");
      this.setPreviousStatement(true);
      this.setNextStatement(true);
    }
  };

  Blockly.Blocks['copernicus_set_led_colour'] = {
    init: function() {
      this.setColour(210);
      this.appendValueInput("COLOUR")
      	.appendField("set colour led")
        .setCheck('CopernicusColour')
        .setAlign(Blockly.ALIGN_RIGHT)
      this.setPreviousStatement(true);
      this.setNextStatement(true);
    }
  };

  Blockly.Blocks['copernicus_colour_picker'] = {
    init: function() {
      this.setColour(210);
      this.appendDummyInput()
          .appendField(new Blockly.FieldDropdown(Copernicus.rgbColours), 'COLOUR');
      this.setOutput(true, 'CopernicusColour');
      this.setTooltip(Blockly.Msg.COLOUR_PICKER_TOOLTIP);
    }
  };

})();

*/