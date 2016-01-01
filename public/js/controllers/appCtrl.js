define(['./module',
        'device',
        'app.msg'],
        function (module, device, msg) {

  'use strict';

  module.controller('AppCtrl',
      ['$scope', '$rootScope', '$uibModal', 'projectService',
      function ($scope, $rootScope, $uibModal, projectService) {

    function downloadTextFile(filename, text) {
      var element = document.createElement('a');
      element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
      element.setAttribute('download', filename);
      element.style.display = 'none';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }

    function openTextInputModal(title, prompt, initialText){
      return $uibModal.open({
        animation: true,
        templateUrl: '/html/textInputModal.html',
        controller: 'TextInputModalCtrl',
        controllerAs: 'modalCtrl',
        resolve: {
          title: function(){return title;},
          prompt: function(){return prompt;},
          initialText: function(){return initialText;}
        }
      });
    }

    this.msg = msg;

    this.openNewProjectModal = function(){
      var modalInstance = openTextInputModal(msg.project.create, msg.project.name, "");

      var self = this;
      modalInstance.result.then(function (text) {
        projectService.setNewProject(text, device.id);
        $rootScope.$broadcast('projectLoaded');
      });
    };

    this.openOpeningProjectModal = function(){
      $('#file-input').click();
    };

    this.openProjectFromJson = function(projectJson){
      projectService.setProjectFromJson(projectJson);
      $rootScope.$broadcast('projectLoaded');
    };

    this.openAboutProgramModal = function() {
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: '/html/aboutProgramModal.html',
        controller: 'AboutProgramCtrl',
        controllerAs: 'modalCtrl',
        resolve: {
          title: function() { return "About project" },
        }
      });
    }

    this.openSavingProjectModal = function(){
      var project = projectService.getProject();
      var modalInstance = openTextInputModal(msg.project.save, msg.project.name, projectService.getProject().name)

      console.log(project);

      modalInstance.result.then(function (text) {
        var persistableProject = projectService.getProject();
        persistableProject.name = text;
        downloadTextFile(text + ".json", JSON.stringify(persistableProject));
      });
    };



  }]);

});