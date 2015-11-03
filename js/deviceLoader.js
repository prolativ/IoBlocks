define(["module", "path", "fs"], function(module, path, fs){

	var deviceLoader = {};

	deviceLoader.loadDir = function(dirPath){
		var devices = [];

		var fileNames = fs.readdirSync(dirPath);
		if(!fileNames){
			console.log("Could not find the directory with devices' descriptions:");
			console.log(dirPath);
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

	return deviceLoader;

});


