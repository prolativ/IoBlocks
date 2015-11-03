define(['./module',
		'blockly',
		'devicesList'
		], function (module, blockly, devices) {
    
    'use strict';

    module.controller('workspaceCtrl', ['$http', function ($http) {
    	var workspace = this;

    	var defaultDeviceId = 'copernicus';
    	workspace.filePath = '';

    	workspace.init = function(project, blocksXml){
    		workspace.project = project;
    		workspace.currentDevice = devices[project.deviceId || defaultDeviceId];
    		workspace.blocksBoard = blockly.inject('blocksBoardDiv', {
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
	    	//TODO
	    };

	    workspace.clean = function(){
	    	workspace.blocksBoard.dispose();
	    }


	    ////////////////////////////

	    var exampleXmlStr = '<xml xmlns="http://www.w3.org/1999/xhtml"><block type="copernicus_event_light" x="102" y="59"><field name="OLD_VAR">old_light</field><field name="NEW_VAR">new_light</field><statement name="REACTION_BLOCK"><block type="text_print"><value name="TEXT"><block type="text"><field name="TEXT">aaaa</field></block></value></block></statement></block><block type="text_print" x="284" y="155"><value name="TEXT"><block type="text"><field name="TEXT">bbb</field></block></value></block></xml>';

    	var sampleProject = {
    		name: 'Sample project',
    		deviceId: defaultDeviceId,
    		config: {}
    	};

    	workspace.init(sampleProject, exampleXmlStr);

    }]);
});