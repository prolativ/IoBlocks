define(['./module',
        'devicesList'], function (module, allDevices) {

  'use strict';

  module.service('projectService', function(localStorageService){
    var getNewProject = function(projectName, device){
      return {
        name: projectName,
        device: device,
        settings: {},
        blocksXml: undefined
      };
    }

    this.setNewProject = function(projectName, device){
      var project = getNewProject(projectName, device);
      this.setProject(project);
    }

    this.setProject = function(project){
      this.project = project;
      localStorageService.set("project", this.getPersistableProject());
    };

    this.setProjectFromJson = function(projectJson){
      try{
        var project = JSON.parse(projectJson);
        project.device = allDevices[project.deviceId];
        delete project.deviceId;
        this.project = project;
      }catch(err){
        console.log("Could not load project from JSON");
      }
    };

    this.getLocallyPersistedProject = function(){
      var project;
      try{
        project = localStorageService.get("project");
        project.device = allDevices[project.deviceId];
        delete project.deviceId;
      }catch(err){
        project = getNewProject()
      }
      return project;
    };

    this.getPersistableProject = function(){
      var project = this.project;
      return{
        name: project.name,
        deviceId: project.device && project.device.id,
        settings: project.settings,
        blocksXml: project.blocksXml
      };
    }

    this.getProject = function(project){
      return this.project;
    };

    this.setBlocksXml = function(blocksXml){
      this.project.blocksXml = blocksXml;
      this.setProject(this.project);
    };

    this.project = this.getLocallyPersistedProject();


  });

});

