define(["blockly",
		"./codeGenerator",
		"text!/../xml/devices/copernicus/toolbox.xml!strip"],
		function(blockly, codeGenerator, toolbox){
	var copernicus = {};

	copernicus.id = 'copernicus';

	copernicus.name = "AGH Copernicus";

	copernicus.description = "AGH Copernicus board";

	copernicus.imageFile = "copernicus.jpg";

	copernicus.codeGenerator = codeGenerator;

	copernicus.toolbox = toolbox;

	return copernicus;
});
