(function(){
    define([
        'angular',
        'angular-route',
        'route-styles',
        './controllers/index',
        './factories/index'
    ], function (angular) {
        'use strict';

        return angular.module('app', [
            'app.factories',
            'app.controllers',
            'ngRoute',
            'routeStyles'
        ]);
    });
})();