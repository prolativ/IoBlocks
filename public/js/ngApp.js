(function(){
    define([
        'angular',
        'angular-route',
        'angular-storage',
        'route-styles',
        './controllers/index',
        './factories/index'
    ], function (ng) {
        'use strict';

        var ngApp = ng.module('app', [
            'app.factories',
            'app.controllers',
            'ngRoute',
            'LocalStorageModule',
            'routeStyles'
        ]);

        ngApp.config(function (localStorageServiceProvider) {
            localStorageServiceProvider
                .setPrefix('IoBlocks');
        });

        return ngApp;
    });
})();