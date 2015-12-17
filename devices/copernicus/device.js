define(["blockly",
    "../device/codeGenerator.js",
    "../device/toolbox.js"],
    function(blockly, codeGenerator, toolbox){
  var copernicus = {};

  copernicus.id = 'copernicus';

  copernicus.codeGenerator = codeGenerator;

  copernicus.toolbox = toolbox;

  copernicus.programmingLanguage = "python";

  return copernicus;
});
