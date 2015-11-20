define(['app'], function (app) {
    'use strict';

    return app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider
        .when('/menu', {
            templateUrl: '/html/mainMenu.html',
            css: '/css/mainMenu.css'
        
        }).when('/workspace', {
            templateUrl: '/html/workspace.html',
            controller: 'workspaceCtrl',
            controllerAs: 'workspace',
            css: '/css/workspace.css'
        
        }).when('/project', {
            templateUrl: '/html/projectSettings.html',
            controller: 'projectSettingsCtrl',
            controllerAs: 'projectSettings',
            css: '/css/projectSettings.css'
        
        }).otherwise({
            redirectTo: '/menu'
        });
    }]);
});