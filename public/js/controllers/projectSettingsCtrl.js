define(['./module',
		'devicesList'
		], function (module, devices) {

	'use strict';

	module.controller('projectSettingsCtrl', ['projectFactory', function (projectFactory) {

		var projectSettings = this;

		var defaultDeviceId = 'copernicus';

		projectSettings.projectName = "";
		projectSettings.allDevices = devices;
		projectSettings.deviceId = defaultDeviceId;

		projectSettings.getDevice = function(){
			return projectSettings.allDevices[projectSettings.deviceId];
		};

		projectSettings.cancel = function(){
			location.href = "#/workspace";
		};

		projectSettings.accept = function(){

		};

	}]);

});