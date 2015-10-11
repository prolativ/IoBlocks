(function(){

	var path = require("path");
	var fs = require("fs");

	var deviceLoader = {};

	deviceLoader.load = function(dirPath){
		dirPath = dirPath || "./devices";
		dirPath = path.resolve(__dirname, dirPath);
		var devices = [];

		var fileNames = fs.readdirSync(dirPath);
		if(!fileNames){
			console.log("Could not find the directory with devices' descriptions:");
			console.log(path.resolve(dirPath))
		}else{
			for(var i = 0; i < fileNames.length; ++i){
				var nameParts = fileNames[i].split(".");
				if(nameParts.length == 2 && nameParts[1] === "js"){
					var deviceName = nameParts[0];
					devices.push(require(dirPath + "/" + deviceName));
				}
			}
		}

		return devices;
	};

	module.exports = deviceLoader;

})();