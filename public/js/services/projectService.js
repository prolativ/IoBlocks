define(['./module',
        'device'], function (module, device) {

  'use strict';

  module.service('projectService', function(localStorageService){
    var createNewProject = function(projectName){
      return {
        name: projectName || "",
        deviceId: device.id,
        settings: {},
        blocksXml: undefined
      };
    };

    this.setNewProject = function(projectName){
      var project = createNewProject(projectName);
      this.setProject(project);
    };

    this.setProject = function(project){
      this.project = project;
      localStorageService.set("project", this.getProject());
    };

    this.setProjectFromJson = function(projectJson){
      try{
        var project = JSON.parse(projectJson);
        if(project.deviceId != device.id)
          throw ("Device '" + deviceId + "' is not supported ");
        this.project = project;
      }catch(err){
        console.log("Could not load project from JSON: " + err);
      }
    };

    this.getLocallyPersistedProject = function(){
      var project;
      try{
        project = localStorageService.get("project");
      }catch(err){
        project = createNewProject();
      }
      return project;
    };

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

