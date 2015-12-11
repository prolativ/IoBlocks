define(['./commons',
        'blockly.python'], function(){

  var Copernicus = Blockly.Copernicus

  var importCopernicus = "from copernicus_helpers import Copernicus";
  var importCopernicusHelpersGetSensor = "from copernicus_helpers import get_initial_sensor_value";
  var importTimer = "from timer import Timer";

  function createSensorHandlerCodeGenerator(apiName, varName){
    function codeGenerator(block){
      var signature = "def " + apiName + "_handler(sensor_value):\n";

      var globals = block ? Blockly.Variables.allVariables(block) : [];
      for (var i = globals.length - 1; i >= 0; i--) {
        globals[i] = Blockly.Python.variableDB_.getName(globals[i], Blockly.Variables.NAME_TYPE);
      }
      globals.push(varName);
      var globalsDeclaration = '  global ' + globals.join(', ') + '\n';

      var sensorValueAssignment = Copernicus.indentMarker + varName + " = sensor_value\n";
      var handlerBody = block ? Blockly.Python.statementToCode(block, 'REACTION_BLOCK') || "" : "";
      var handlerCode = signature + globalsDeclaration + sensorValueAssignment + handlerBody;
      var settingHandler = "api.set_handler('" + apiName + "', " + apiName + "_handler)\n";

      var sensorVarInit = varName + " = get_initial_sensor_value('" + apiName + "')\n";

      Copernicus.activeSensors[apiName] = {
        varInit: sensorVarInit,
        handlerCode: handlerCode,
        settingHandler: settingHandler
      };

      Blockly.Python.definitions_['import_copernicus_helpers_get_sensor'] = importCopernicusHelpersGetSensor;
      return null;
    }

    return codeGenerator;
  }

  function createSensorValueGetterCodeGenerator(apiName, varName){
    function codeGenerator(block){
      if(!Blockly.Python.definitions_[apiName]){
        createSensorHandlerCodeGenerator(apiName, varName)(null);
      }
      return [varName, Blockly.Python.ORDER_ATOMIC];
    }

    return codeGenerator;
  }

  for(var i=0; i<Copernicus.sensors.length; ++i){
    var sensor = Copernicus.sensors[i];
    Blockly.Python["copernicus_event_" + sensor.apiName] = createSensorHandlerCodeGenerator(sensor.apiName, sensor.varName);
    Blockly.Python["copernicus_get_" + sensor.apiName] = createSensorValueGetterCodeGenerator(sensor.apiName, sensor.varName);
  }


  Blockly.Python['copernicus'] = function(block){

    var mainInit = block.getChildren().map(function(childBlock){
      var code = Blockly.Python.blockToCode(childBlock)
      return Array.isArray(code) ? null : code;
    }).join("");

    var varsInit = [];
    var handlersCode = [];
    var settingSensorHandlers = [];
    for(var apiName in Copernicus.activeSensors){
      var activeSensor = Copernicus.activeSensors[apiName];
      varsInit.push(activeSensor.varInit);
      handlersCode.push(activeSensor.handlerCode);
      settingSensorHandlers.push(activeSensor.settingHandler);
    }

    var startingAlwaysTimer = Copernicus.isAlwaysTimerDefined ? "timer_always.start()\n" : "";

    Blockly.Python.definitions_['copernicus_sensor_vars_init'] = varsInit.join("");
    Blockly.Python.definitions_['copernicus_sensor_events'] = handlersCode.join("\n");

      Blockly.Python.definitions_['import_copernicus'] = "from copernicus_helpers import Copernicus";

      var apiInit = "api = Copernicus()\n";
      var eventsSubscription = "api.command('subscribe', '*')\n";
      var mainLoop = "while True:\n  api.listen()\n\n";

      var code = [mainInit, apiInit, settingSensorHandlers.join(""), eventsSubscription, startingAlwaysTimer, mainLoop].join("\n");

      return code;
    };


  Blockly.Python['copernicus_set_servo'] = function(block){
    var position = Blockly.Python.valueToCode(block, 'POSITION', Blockly.Python.ORDER_ATOMIC) || 0;
    var code = "api.command('servo', " + position + ")\n";
    return code;
  };


  Blockly.Python['copernicus_set_led_white'] = function(block) {
    var state = Blockly.Python.valueToCode(block, 'LED_STATE', Blockly.Python.ORDER_ATOMIC) || 'False';
    var code = "api.command('led', " + state + ")\n";
    return code;
  };  
  
  Blockly.Python['copernicus_set_led_colour'] = function(block){
    var colour = Blockly.Python.valueToCode(block, 'COLOUR', Blockly.Python.ORDER_ATOMIC) || "\'#ffffff\'";
    var code = "api.command('rgb', " + colour + ")\n";
    return code;
  };

  Blockly.Python['copernicus_colour_picker'] = function(block) {
    var code = "\'" + (block.getFieldValue("COLOUR") || "#ffffff") + "\'";
    return [code, Blockly.Python.ORDER_ATOMIC];
  };


  Blockly.Python['copernicus_event_timer'] = function(block){
    Blockly.Python.definitions_['import_timer'] = importTimer;
    var timerName = block.getFieldValue("TIMER_NAME").slice(6, 7);
    if(timerName == "*"){
      timerName = "always";
    }
    var interval = Blockly.Python.valueToCode(block, 'INTERVAL', Blockly.Python.ORDER_ATOMIC) || '1';
    var intervalTimeUnit = block.getFieldValue("INTERVAL_TIME_UNIT");
    var repetitions = Blockly.Python.valueToCode(block, 'REPETITIONS', Blockly.Python.ORDER_ATOMIC) || '1';
    var delay = Blockly.Python.valueToCode(block, 'DELAY', Blockly.Python.ORDER_ATOMIC) || '0';
    var delayTimeUnit = block.getFieldValue("DELAY_TIME_UNIT");

    var signature = "def timer_" + timerName + "_handler():\n";

    var globals = block ? Blockly.Variables.allVariables(block) : [];
      for (var i = globals.length - 1; i >= 0; i--) {
        globals[i] = Blockly.Python.variableDB_.getName(globals[i], Blockly.Variables.NAME_TYPE);
      }
    var globalsDeclaration = (globals.length > 0) ? ('  global ' + globals.join(', ') + '\n') : '';

    var handlerBody = Blockly.Python.statementToCode(block, 'REACTION_BLOCK') || Blockly.Python.PASS;
    var handlerBody = block ? Blockly.Python.statementToCode(block, 'REACTION_BLOCK') || Blockly.Python.PASS : Blockly.Python.PASS;
    var handlerCode = signature + globalsDeclaration + handlerBody;
    var settingHandler = "timer_" + timerName + " = Timer(" + interval + ", '" + intervalTimeUnit + "', " + repetitions + ", " +
      delay + ", '" + delayTimeUnit + "', timer_" + timerName + "_handler)\n";

    Blockly.Python.definitions_['timer_' + timerName] = handlerCode + "\n" + settingHandler;

    if(timerName == "always"){
      Copernicus.isAlwaysTimerDefined = true;
    }

    return null;
  }



  Blockly.Python['copernicus_timer_start'] = function(block){
    Blockly.Python.definitions_['import_timer'] = importTimer;
    var timerName = block.getFieldValue("TIMER_NAME").slice(6,7);
    var code = "timer_" + timerName + ".start()\n"

    return code;
  }

  Blockly.Python['copernicus_timer_stop'] = function(block){
    Blockly.Python.definitions_['import_timer'] = importTimer;
    var timerName = block.getFieldValue("TIMER_NAME").slice(6,7);
    var code = "timer_" + timerName + ".stop()\n"

    return code;
  }

});
