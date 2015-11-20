define(['./module',
		'devicesList'
		], function (module, devices) {

	'use strict';

	module.controller('projectSettingsCtrl', [function () {
		var projectSettings = this;

		var defaultDeviceId = 'copernicus';

		projectSettings.projectName = "";
		projectSettings.allDevices = devices;
		projectSettings.deviceId = defaultDeviceId;

		projectSettings.getDevice = function(){
			return projectSettings.allDevices[projectSettings.deviceId];
		};

	}]);


});