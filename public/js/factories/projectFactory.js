define(['./module'], function (module) {

	'use strict';

	module.factory('projectFactory', function(){
		return {
			isNewProject: true,
			project: {
				name: 'Sample project',
	    		deviceId: 'copernicus',
	    		settings: {}
			},
			isAccepted: false
    	};
	});

});

