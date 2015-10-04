define(['app'], function (app) {
    'use strict';

    return app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider
        .when('/workspace', {
            templateUrl: '/html/workspace.html',
            controller: 'workspaceCtrl'
        
        }).otherwise({
            redirectTo: '/workspace'
        });
    }]);
});