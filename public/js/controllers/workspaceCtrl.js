define(['./module',
		'devicesList',
		'blockly'
		], function (module, devices) {
    
    'use strict';

    module.controller('workspaceCtrl', ['$http', function ($http) {
    	var workspace = this;

    	var defaultDeviceId = 'copernicus';
    	workspace.filePath = '';

    	workspace.init = function(project, blocksXml){
    		workspace.project = project;
    		workspace.currentDevice = devices[project.deviceId || defaultDeviceId];
    		workspace.blocksBoard = Blockly.inject('blocksBoardDiv', {
    			toolbox: workspace.currentDevice.toolbox,
    			media: 'lib/blockly/media/'
    		});

    		
    		if(blocksXml){
    			var blocksDom = Blockly.Xml.textToDom(blocksXml);
    			Blockly.Xml.domToWorkspace(workspace.blocksBoard, blocksDom);
    		}
    	};

	    workspace.openNewProject = function(){
	    	//TODO: Select device, name, (config)

	    	workspace.blocksBoard.dispose(); //clean previous project

	    	var project = {
	    		name: '',
	    		deviceId: defaultDeviceId,
	    		config: {}
	    	};

	    	workspace.init(project);
	    };

	    workspace.openExistingProject = function(){
	    	var filePath = workspace.filePath; //TODO - fileChooser
	    	
	    	$http({ 
			    method: 'POST',
			    url: '/project/load',
			    data: {
			    	filePath: filePath,
			    },
			}).then(function(response){//success
				workspace.blocksBoard.dispose();
				workspace.init(response.data.project, response.data.blocksXml);
    		}, function(response){//failure
    			console.log('Could not open the project');
    			workspace.init(response.data.project, undefined);
    		});  	
	    };

	    workspace.saveCurrentProject = function(){
	    	var dom = Blockly.Xml.workspaceToDom(workspace.blocksBoard);
	    	var blocksXml = Blockly.Xml.domToText(dom);
	    	var filePath = workspace.filePath; //TODO - fileChooser
	    	
	    	$http({ 
			    method: 'POST',
			    url: '/project/save',
			    data: {
			    	filePath: filePath,
			    	fileData: {
			    		project: workspace.project,
			    		blocksXml: blocksXml
			    	}
			    },
			}).then(function(response){//success
    			console.log('Project saved');
    		}, function(response){//failure
    			console.log('Could not save the project');
    		});  	
	    };

	    workspace.changeSettings = function(){
	    	//TODO
	    };
	    
	    workspace.showCode = function(){
	    	alert(workspace.generateCode());
	    };

	    workspace.generateCode = function(){
	    	var programXml = Blockly.Xml.workspaceToDom(workspace.blocksBoard);
        return workspace.currentDevice.codeGenerator.generateCode(programXml);
	    };

	    workspace.runCode = function(){
        var code = workspace.generateCode();

        $http({
          method: 'POST',
          url: '/project/run',
          data: {
            code: code
          }
        }).then(function(response){
          console.log('runCode: success');
        }, function(response){
          console.log('runCode: failure');
        });
      };

	    workspace.clean = function(){
	    	workspace.blocksBoard.dispose();
	    	workspace.init(workspace.project);
	    };

	    workspace.saveSnapshot = function(){
	    	var dom = Blockly.Xml.workspaceToDom(workspace.blocksBoard);
	    	var blocksXml = Blockly.Xml.domToText(dom);

	    	$http({ 
			    method: 'POST',
			    url: '/snapshot',
			    data: {
			    	snapshot: blocksXml
			    },
			}).then(function(response){//success
    			console.log('Snapshot saved');
    		}, function(response){//failure
    			console.log('Could not save the snapshot');
    		});  
	    }


	    ////////////////////////////

	    var sampleProject = {
    		name: 'Sample project',
    		deviceId: defaultDeviceId,
    		config: {}
    	};

    	/////////////////////

    	$http({ 
		    method: 'GET',
		    url: '/snapshot'
		}).then(function(response){//success
			workspace.init(sampleProject, response.data.snapshot);
		}, function(response){//failure
			console.log('Could not load the snapshot');
			workspace.init(sampleProject, undefined);
		});


    }]);
});