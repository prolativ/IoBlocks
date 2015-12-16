define(["blockly",
    "../device/codeGenerator.js",
    "../device/toolbox.js"],
    function(blockly, codeGenerator, toolbox){
  var copernicus = {};

  copernicus.id = 'copernicus';

  copernicus.name = "AGH Copernicus";

  copernicus.description = "AGH Copernicus board";

  copernicus.imageFile = "copernicus.jpg";

  copernicus.codeGenerator = codeGenerator;

  copernicus.toolbox = toolbox;

  copernicus.programmingLanguage = "python";

  return copernicus;
});
