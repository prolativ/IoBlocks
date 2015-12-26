define(['./module'],
        function (module) {

  'use strict';

  module.controller('AboutProgramCtrl', function ($uibModalInstance, title) {
    this.title = title;
    this.text = "hej";

    this.accept = function () {
      $uibModalInstance.close(this.text);
    };
  });
});