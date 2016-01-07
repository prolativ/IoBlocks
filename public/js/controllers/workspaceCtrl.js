define(['./module',
        'socketio',
        'device',
        'app.msg',
        'blockly',
        'jquery.bootstrap',
        'rainbow-python'
        ], function (module, socketio, device, msg) {

  'use strict';

  module.controller('WorkspaceCtrl',
      ['$scope', '$http', 'projectService',
      function ($scope, $http, projectService) {

    this.init = function(){
      this.msg = msg;

      this.workspace = Blockly.inject('blockly-div', {
        toolbox: device.toolbox,
        media: 'lib/blockly/media/'
      });

      $('#blockly-div').trigger('resize');

      function updateCodePreview(code){
        $("#generated-code")
          .empty()
          .append(code);
      }

      var self = this;

      this.workspace.addChangeListener(function(){
        var blocksDom = Blockly.Xml.workspaceToDom(self.workspace);
        projectService.setBlocksXml(Blockly.Xml.domToText(blocksDom));
		    self.code = self.generateCode();
        if(device.programmingLanguage){
          Rainbow.color(self.code, device.programmingLanguage, function(highlighted_code) {
            updateCodePreview($.parseHTML(highlighted_code));
          });
        }else{
          updateCodePreview(self.code);
        }
      });

      this.hiddenSidebar = false;

      this.loadProject();

      var socket = socketio();
      socket.on('program stdout', function(msg) {
        var consoleOutput = $("#console-out");
        var oldText = consoleOutput.val()
        consoleOutput.val(oldText + msg);
        consoleOutput.scrollTop(consoleOutput[0].scrollHeight);
      });


      //resize after some time to initialize/position workspace
      function initWorkspacePosition(repetitions){
        if(repetitions > 0){
          Blockly.fireUiEvent(window, 'resize');
          setTimeout(function(){
            initWorkspacePosition(repetitions - 1);
          }, 200);
        }
      }

      initWorkspacePosition(10);
  	};

    this.loadProject = function(){
      var project = projectService.getProject();

      this.code = "";
      this.isCodeVisible = true;
      this.isConsoleVisible = true;
      this.workspace.clear();
      this.workspace.updateToolbox(device.toolbox);

      if(project.blocksXml){
        var blocksDom = Blockly.Xml.textToDom(project.blocksXml);
        Blockly.Xml.domToWorkspace(this.workspace, blocksDom);
      }

      this.clearOutConsole();
      this.clearInConsole();

      this.workspace.fireChangeEvent();
    };

    this.generateCode = function(){
      return device.codeGenerator.generateCode(this.workspace);
    };

    this.toggleCodeVisible = function() {
      this.isCodeVisible = !this.isCodeVisible;
      if (this.isCodeVisible) {
        $("#blockly-area").width("60%");
      } else {
        $("#blockly-area").width("97%");
      }
      Blockly.fireUiEvent(window, 'resize');
    };

    this.toggleConsoleVisible = function() {
      this.isConsoleVisible = !this.isConsoleVisible;
      if (this.isConsoleVisible) {
        $(".blocks-and-code").height("60vh");
      } else {
        $(".blocks-and-code").height("94vh");
      }
      Blockly.fireUiEvent(window, 'resize');
    }

    this.cleanWorkspace = function() {
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
          url: '/program/text-input',
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
    	  url: '/program/run',
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