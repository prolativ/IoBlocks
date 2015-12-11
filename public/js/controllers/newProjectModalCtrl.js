define(['./module',
        'devicesList'],
        function (module, allDevices) {

  'use strict';

  module.controller('NewProjectModalCtrl', function ($uibModalInstance) {
    this.projectName = "";
    this.selectedDevice = undefined;
    this.allDevices = allDevices;

    this.accept = function () {
      $uibModalInstance.close({
        projectName: this.projectName,
        device: this.selectedDevice
      });
    };

    this.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  });
});