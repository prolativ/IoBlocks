define(["blockly",
		"./codeGenerator",
		"text!./toolbox.xml!strip"],
		function(blockly, codeGenerator, toolbox){
	var copernicus = {};

	copernicus.id = 'copernicus';

	copernicus.name = "AGH Copernicus";

	copernicus.codeGenerator = codeGenerator;

	copernicus.toolbox = toolbox;

	return copernicus;
});
