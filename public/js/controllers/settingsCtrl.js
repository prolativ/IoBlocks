define(['./module',
        'devicesList'
       ], function (module, devices) {

  'use strict';

  module.controller('SettingsCtrl', ['projectFactory', function (projectFactory) {
    var defaultDeviceId = 'copernicus';

    this.projectName = "";
    this.allDevices = devices;
    this.deviceId = defaultDeviceId;

    this.getDevice = function(){
      return this.allDevices[this.deviceId];
    };

    this.cancel = function(){
      location.href = "#/workspace";
    };

    this.accept = function(){

    };

  }]);

});