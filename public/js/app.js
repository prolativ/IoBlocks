define([
    'angular',
    'angular-bootstrap',
    'angular-route',
    'angular-storage',
    'route-styles',
    './services/index',
    './controllers/index',
    './directives/index'
], function (ng) {
  'use strict';

  var app = ng.module('app', [
    'app.services',
    'app.controllers',
    'app.directives',
    'LocalStorageModule',
    'ngRoute',
    'routeStyles',
    'ui.bootstrap'
  ]);

  app.config(function (localStorageServiceProvider) {
    localStorageServiceProvider
      .setPrefix('IoBlocks');
  });

  return app;
});