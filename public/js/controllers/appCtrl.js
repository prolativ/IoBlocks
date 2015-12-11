define(['./module'],
        function (module) {

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

    this.openNewProjectModal = function(){
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: '/html/newProjectModal.html',
        controller: 'NewProjectModalCtrl',
        controllerAs: 'modalCtrl',
      });

      var self = this;
      modalInstance.result.then(function (projectData) {
        projectService.setNewProject(projectData.projectName, projectData.device);
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

    this.openSavingProjectModal = function(){
      var project = projectService.getProject();
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: '/html/textInputModal.html',
        controller: 'TextInputModalCtrl',
        controllerAs: 'modalCtrl',
        resolve: {
          title: function(){return "Save project";},
          prompt: function(){return "Name of the project:";},
          initialText: function(){return projectService.getProject().name;}
        }
      });

      modalInstance.result.then(function (text) {
        var persistableProject = projectService.getPersistableProject();
        persistableProject.name = text;
        downloadTextFile(text + ".json", JSON.stringify(persistableProject));
      });
    };

  }]);

});