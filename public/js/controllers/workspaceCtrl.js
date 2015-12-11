define(['./module',
        'socketio',
        'devicesList',
        'text!/../xml/defaultToolbox.xml!strip',
        'blockly',
        'jquery.bootstrap',
        'rainbow-python'
        ], function (module, socketio, devices, defaultToolbox) {

  'use strict';

  module.controller('WorkspaceCtrl',
      ['$scope', '$http', '$q', 'projectService',
      function ($scope, $http, $q, projectService) {

    this.init = function(){
      this.workspace = Blockly.inject('blockly-div', {
        toolbox: defaultToolbox,
        media: 'lib/blockly/media/'
      });

      this.loadProject();

      var self = this;
      this.workspace.addChangeListener(function(){
        $scope.$apply(function() {
          var blocksDom = Blockly.Xml.workspaceToDom(self.workspace);
          projectService.setBlocksXml(Blockly.Xml.domToText(blocksDom));
			    self.code = self.generateCode();
          Rainbow.color();
        });
      });

      var socket = socketio();
      socket.on('server data', function(msg) {
        var consoleOutput = $("#console-out");
        var oldText = consoleOutput.val()
        consoleOutput.val(oldText + msg);
        consoleOutput.scrollTop(consoleOutput[0].scrollHeight);

      });
  	};

    this.loadProject = function(){
      var project = projectService.getProject();

      this.code = "";
      this.isCodeVisible = true;

      this.currentDevice = project.device;

      this.workspace.clear();

      var toolbox = this.currentDevice && this.currentDevice.toolbox || defaultToolbox;
      this.workspace.updateToolbox(toolbox);

      if(project.blocksXml){
        var blocksDom = Blockly.Xml.textToDom(project.blocksXml);
        Blockly.Xml.domToWorkspace(this.workspace, blocksDom);
      }

      this.code = this.generateCode();
      this.toggleCodeVisible();

      this.clearOutConsole();
      this.clearInConsole();

      this.workspace.fireChangeEvent();
    };

    this.generateCode = function(){
      if(this.currentDevice){
        return this.currentDevice.codeGenerator.generateCode(this.workspace);
      }
      return Blockly.Python.workspaceToCode(this.workspace);
    };

    this.toggleCodeVisible = function(){
      this.isCodeVisible = !this.isCodeVisible;
      if (this.isCodeVisible) {
        $("#blockly-area").width("60%");
      } else {
        $("#blockly-area").width("97%");
      }
      Blockly.fireUiEvent(window, 'resize');
    };

    this.cleanWorkspace = function(){
      this.workspace.clear();
    };

    this.clearOutConsole = function() {
      $("#console-out").val("");
    };

    this.clearInConsole = function() {
      $("#console-in").val("");
    };

    this.consoleInKeyUp = function(event){
      if(event.keyCode == 13){ //enter key
        $http({
          method: 'POST',
          url: '/project/text',
          data: {
            text: $('#console-in').val()
          }
        });

        $('#console-in').val("");
      }
    };

    this.runCode = function(){
    	$http({
    	  method: 'POST',
    	  url: '/project/run',
        data: {
    		  code: this.code
    	  }
    	}).then(function(response){
    	  console.log('runCode: success');
    	}, function(response){
    	  console.log('runCode: failure');
    	});
    };

    this.stopProgram = function() {
      $http({
        method: 'GET',
        url: '/program/stop'
      }).then(function(response){
        console.log('program stopped');
      });
    };

    var self = this;
    $scope.$on("projectLoaded", function(){
      self.loadProject();
    })

    this.init();
  }]);
});