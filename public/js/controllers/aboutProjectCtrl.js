define(['./module'],
        function (module) {

  'use strict';

  module.controller('AboutProjectCtrl', function ($uibModalInstance, title) {
    this.title = title;
    this.text = "hej";

    this.accept = function () {
      $uibModalInstance.close(this.text);
    };
  });
});