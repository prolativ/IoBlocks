define(['app'], function (app) {
  'use strict';

  return app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
    .when('/menu', {
      templateUrl: '/html/mainMenu.html',
      css: '/css/mainMenu.css'
    
    }).when('/workspace', {
      templateUrl: '/html/workspace.html',
      controller: 'WorkspaceCtrl',
      controllerAs: 'workspaceCtrl',
      css: ['/css/workspace.css', '/css/skin-blue.css', '/css/AdminLTE.css']
    
    }).when('/project', {
      templateUrl: '/html/settings.html',
      controller: 'SettingsCtrl',
      controllerAs: 'settingsCtrl',
      css: '/css/settings.css'
    
    }).otherwise({
      redirectTo: '/menu'
    });
  }]);
});