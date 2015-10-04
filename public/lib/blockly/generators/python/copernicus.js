Blockly.Python['copernicus_set_led_white'] = function(block) {
  var state = (block.getFieldValue('LED_STATE') == 'LED_ON') ? 'True' : 'False';
  var code = "api.command('led', "  + state + ")";
  return [code, Blockly.JavaScript.ORDER_MEMBER];
};