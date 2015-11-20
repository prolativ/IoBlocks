define(['./module',
		], [function (module) {

	'use strict';

	module.factory('Project', function(){
		return {
    		name: 'Sample project',
    		deviceId: 'copernicus',
    		settings: {}
    	};
	});

}]);

