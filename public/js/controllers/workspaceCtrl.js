define(['./module',
        'devicesList',
        'blockly',
        'jquery.bootstrap'
        ], function (module, devices) {
  
  'use strict';

  module.controller('WorkspaceCtrl',
      ['$scope', '$http', '$q', 'localStorageService', 'projectFactory',
      function ($scope, $http, $q, storage, projectFactory) {
  	
    var workspace = this;

    this.host = '';
    this.user = '';
    this.password = '';

  	this.init = function(project, blocksXml){
  		this.code = "";
  		this.isCodeVisible = false;

  		this.project = project;
  		this.currentDevice = devices[project.deviceId || defaultDeviceId];
  		this.blocksBoard = Blockly.inject('blocksBoardDiv', {
  			toolbox: this.currentDevice.toolbox,
  			media: 'lib/blockly/media/'
  		});

      var self = this;

  		this.blocksBoard.addChangeListener(function(){
				$scope.$apply(function() {
				    self.code = self.generateCode();
            self.saveBlocksSnapshot();
				});
    	});

  		if(blocksXml){
  			var blocksDom = Blockly.Xml.textToDom(blocksXml);
  			Blockly.Xml.domToWorkspace(this.blocksBoard, blocksDom);
  		}

      this.code = this.generateCode();
      this.toggleCodeVisible();
  	};

    this.openNewProject = function(){
    	//TODO: Select device, name, (settings)

      location.href = "/#/project";

      /*

    	this.blocksBoard.dispose(); //clean previous project

    	var project = {
    		name: '',
    		deviceId: defaultDeviceId,
    		settings: {}
    	};

    	this.init(project);

      */
    };

    this.openExistingProject = function(){



    	var filePath = this.filePath; //TODO - fileChooser
    	
      var self = this;

    	$http({
		    method: 'POST',
		    url: '/project/load',
		    data: {
		    	filePath: filePath,
		    },
		  }).then(function(response){//success
        self.blocksBoard.dispose();
        self.init(response.data.project, response.data.blocksXml);
  		}, function(response){//failure
  			console.log('Could not open the project');
  			self.init(response.data.project, undefined);
  		});
    };

    this.saveCurrentProject = function(){
    	var dom = Blockly.Xml.workspaceToDom(this.blocksBoard);
    	var blocksXml = Blockly.Xml.domToText(dom);
    	var filePath = this.filePath; //TODO - fileChooser

      var self = this;

    	$http({
		    method: 'POST',
		    url: '/project/save',
		    data: {
		    	filePath: filePath,
		    	fileData: {
		    		project: self.project,
		    		blocksXml: blocksXml
		    	}
		    },
		  }).then(function(response){//success
  			console.log('Project saved');
  		}, function(response){//failure
  			console.log('Could not save the project');
  		});
    };

    this.saveBlocksSnapshot = function(){
      storage.set("blocksBoard", this.getStringifiedBlocksBoard());
    };

    this.loadBlocksSnapshot = function(){
      this.blocksBoard = storage.get("blocksBoard");
    };

    this.loadProjectSnapshot = function(){
      var sampleProject = {
        name: 'Sample project',
        deviceId: 'copernicus',
        settings: {}
      };

      this.project = storage.get("project") || sampleProject;
    };

    this.changeSettings = function(){
      var host = this.host;
      var user = this.user;
      var password = this.password;

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

    this.toggleCodeVisible = function(){
		  this.isCodeVisible = !this.isCodeVisible;
		  if (this.isCodeVisible) {
		    //$("#blocksBoardDiv").width("60%");
		  } else {
		    //$("#blocksBoardDiv").width("100%");
		  }
    };
    
  	this.generateCode = function(){
  		return this.currentDevice.codeGenerator.generateCode(this.blocksBoard);
  	};

    this.runCode = function(){
    	var code = this.generateCode();

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

    this.clean = function(){
    	this.blocksBoard.dispose();
    	this.init(this.project);
      this.saveBlocksSnapshot();
    };

    this.getStringifiedBlocksBoard = function(){
      var dom = Blockly.Xml.workspaceToDom(this.blocksBoard);
      var blocksXml = Blockly.Xml.domToText(dom);
      return blocksXml;
    };

    this.stopProgram = function() {
      $http({
        method: 'GET',
        url: '/program/stop'
      }).then(function(response){
        console.log('ok');
      });
    };

    this.clearConsole = function() {
      $(".console-ul").empty();
    }

    this.test = function() {
      $http({
        method: 'GET',
        url: '/program/test'
      }).then(function(response) {
        /* */
      });
    }

    this.loadProjectSettings = function(){
      var self = this;
      $http({
        method: 'GET',
        url: '/project/settings/load'
      }).then(function(response) {
        self.host = response.data.host;
        self.user = response.data.user;
        self.password = response.data.password;
      });
    };

    ////////////////////////

    this.loadProjectSnapshot();
    this.loadBlocksSnapshot();

    this.init(this.project, this.blocksBoard);

  }]);
});