define(['./module'], function (module) {

  'use strict';

  module.controller('AppCtrl', ['$scope', 'projectFactory', function ($scope, projectFactory) {

    var app = this;

    this.loadProject = function(project){
      console.log(project);
      $scope.broadcast('projectLoaded', project);
    };

  }]);

});