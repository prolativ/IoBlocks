define(['app'], function (app) {
  'use strict';

  return app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/workspace', {
        templateUrl: '/html/workspace.html',
        controller: 'WorkspaceCtrl',
        controllerAs: 'workspaceCtrl',
        css: ['/css/workspace.css', '/css/skin-blue.css', '/css/AdminLTE.css', '/css/github.css']
      }).otherwise({
        redirectTo: '/workspace'
      });
  }]);
});