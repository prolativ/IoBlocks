define(['./module',
        'app.msg'],
        function (module, msg) {

  'use strict';

  module.controller('TextInputModalCtrl', function ($uibModalInstance, title, prompt, initialText) {
    this.msg = msg;
    this.title = title;
    this.prompt = prompt;
    this.text = initialText || "";

    this.accept = function () {
      $uibModalInstance.close(this.text);
    };

    this.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  });
});