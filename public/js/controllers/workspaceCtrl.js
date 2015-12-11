define(['./module',
        'devicesList',
        'text!/../xml/defaultToolbox.xml!strip',
        'blockly',
        'jquery.bootstrap',
        'rainbow',
        'rainbow-generic',
        'rainbow-python'
        ], function (module, devices, defaultToolbox) {
  
  'use strict';

  module.controller('WorkspaceCtrl',
      ['$scope', '$http', '$q', 'projectService',
      function ($scope, $http, $q, projectService) {

    this.host = '';
    this.user = '';
    this.password = '';

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

      Blockly.fireUiEvent(window, 'resize');
    };

    this.loadProject = function(){
      var project = projectService.getProject();

      this.code = "";
      this.isCodeVisible = true;

      //this.project = project;
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

    this.clearConsole = function() {
      $(".console-ul").empty();
    }

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

    this.stopProgram = function() {
      $http({
        method: 'GET',
        url: '/program/stop'
      }).then(function(response){
        console.log('program stopped');
      });
    };

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

    var self = this;
    $scope.$on("projectLoaded", function(){
      self.loadProject();
    })

    this.init();
  }]);
});