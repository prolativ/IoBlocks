define(['./module',
        'devicesList',
        'blockly',
        'jquery.bootstrap'
        ], function (module, devices) {
  
  'use strict';

  module.controller('workspaceCtrl',
      ['$scope', '$http', '$q', 'localStorageService', 'projectFactory',
      function ($scope, $http, $q, storage, projectFactory) {
  	
    var workspace = this;

    workspace.host = '';
    workspace.user = '';
    workspace.password = '';

  	workspace.init = function(project, blocksXml){
  		workspace.code = "";
  		workspace.isCodeVisible = false;

  		workspace.project = project;
  		workspace.currentDevice = devices[project.deviceId || defaultDeviceId];
  		workspace.blocksBoard = Blockly.inject('blocksBoardDiv', {
  			toolbox: workspace.currentDevice.toolbox,
  			media: 'lib/blockly/media/'
  		});

  		workspace.blocksBoard.addChangeListener(function(){
				$scope.$apply(function() {
				    workspace.code = workspace.generateCode();
            workspace.saveBlocksSnapshot();
				});
    	});

  		if(blocksXml){
  			var blocksDom = Blockly.Xml.textToDom(blocksXml);
  			Blockly.Xml.domToWorkspace(workspace.blocksBoard, blocksDom);
  		}

      workspace.code = workspace.generateCode();
      workspace.toggleCodeVisible();
      //workspace.isCodeVisible = true;
  	};

    workspace.openNewProject = function(){
    	//TODO: Select device, name, (settings)

      location.href = "/#/project";

      /*

    	workspace.blocksBoard.dispose(); //clean previous project

    	var project = {
    		name: '',
    		deviceId: defaultDeviceId,
    		settings: {}
    	};

    	workspace.init(project);

      */
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

    workspace.saveBlocksSnapshot = function(){
      storage.set("blocksBoard", workspace.getStringifiedBlocksBoard());
    };

    workspace.loadBlocksSnapshot = function(){
      workspace.blocksBoard = storage.get("blocksBoard");
    };

    workspace.loadProjectSnapshot = function(){
      var sampleProject = {
        name: 'Sample project',
        deviceId: 'copernicus',
        settings: {}
      };

      workspace.project = storage.get("project") || sampleProject;
    };

    workspace.changeSettings = function(){
      var host = workspace.host;
      var user = workspace.user;
      var password = workspace.password;

      $http({
        method: 'POST',
        url: '/project/settings/save',
        data: {
          host: host,
          user: user,
          password: password
        }
      });
    };

    workspace.toggleCodeVisible = function(){
		  workspace.isCodeVisible = !workspace.isCodeVisible;
		  if (workspace.isCodeVisible) {
		    //$("#blocksBoardDiv").width("60%");
		  } else {
		    //$("#blocksBoardDiv").width("100%");
		  }
    };
    
  	workspace.generateCode = function(){
  		return workspace.currentDevice.codeGenerator.generateCode(workspace.blocksBoard);
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
      workspace.saveBlocksSnapshot();
    };

    workspace.getStringifiedBlocksBoard = function(){
      var dom = Blockly.Xml.workspaceToDom(workspace.blocksBoard);
      var blocksXml = Blockly.Xml.domToText(dom);
      return blocksXml;
    };

    workspace.stopProgram = function() {
      $http({
        method: 'GET',
        url: '/program/stop'
      }).then(function(response){
        console.log('ok');
      });
    };

    workspace.clearConsole = function() {
      $(".console-ul").empty();
    }

    workspace.test = function() {
      $http({
        method: 'GET',
        url: '/program/test'
      }).then(function(response) {
        /* */
      });
    }

    $http({
      method: 'GET',
      url: '/project/settings/load'
    }).then(function(response) {
      workspace.host = response.data.host;
      workspace.user = response.data.user;
      workspace.password = response.data.password;
    });

    ////////////////////////

    workspace.loadProjectSnapshot();
    workspace.loadBlocksSnapshot();

    workspace.init(workspace.project, workspace.blocksBoard);

  }]);
});