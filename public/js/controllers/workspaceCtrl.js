define(['./module',
		'blockly',
		'blockly.blocks',
		'blockly.msg',
		'blockly.python',
		'blockly.copernicus.blocks',
		'blockly.copernicus.python'
		], function (module, blockly) {
    
    'use strict';
    module.controller('workspaceCtrl', ['$scope', function ($scope) {
	    $scope.workspace = blockly.inject('workspaceDiv', {toolbox: document.getElementById('toolboxXml')});
	    $scope.showCode = function(){
	    	alert(Blockly.Python.workspaceToCode($scope.workspace));
	    };
    }]);
});