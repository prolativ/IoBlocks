define([
    'angular',
    'angular-route',
    'angular-storage',
    'route-styles',
    './controllers/index',
    './factories/index',
    './directives/index'
], function (ng) {
  'use strict';

  var app = ng.module('app', [
    'app.factories',
    'app.controllers',
    'app.directives',
    'ngRoute',
    'LocalStorageModule',
    'routeStyles'
  ]);

  app.config(function (localStorageServiceProvider) {
    localStorageServiceProvider
      .setPrefix('IoBlocks');
  });

  return app;
});