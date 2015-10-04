(function(){
    define([
        'angular',
        'angular-route',
        './controllers/index'
    ], function (angular) {
        'use strict';

        return angular.module('app', [
            'app.controllers',
            'ngRoute'
        ]);
    });
})();