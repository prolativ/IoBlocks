(function(){

  var languageMappings = {'en': 'en', 'en-us': 'en', 'pl': 'pl'};

  var browserLanguage = (navigator.language || navigator.browserLanguage || 'en').toLowerCase();
  var appLanguage = languageMappings[browserLanguage] || 'en';

  require.config({
    baseUrl: 'js',

    config: {
      'appConf': {
        language: appLanguage
      }
    },

    paths: {
      'angular': '../lib/angular/angular',
      'angular-route': '../lib/angular-route/angular-route',
      'angular-storage': '../lib/angular-local-storage/dist/angular-local-storage.min',
      'app': './app',
      'blockly': './blockly-extended',
      'blockly.base': '../lib/blockly/blockly_compressed',
      'blockly.blocks': '../lib/blockly/blocks_compressed',
      'blockly.msg': '../lib/blockly/msg/js/' + appLanguage,
      'blockly.python': '../lib/blockly/python_compressed',
      'copernicus.blockly.blocks': '../devices/copernicus/blocklyBlocks',
      'copernicus.blockly.generators': '../devices/copernicus/blocklyGenerators',
      'copernicus.commons': '../devices/copernicus/commons',
      'devicesList': '../devices/index',
      'domReady': '../lib/requirejs-domready/domReady',
      'jquery': '../lib/jquery/jquery-2.1.4.min',
      'jquery.bootstrap': '../lib/jquery/bootstrap-3.3.5.min',
      'route-styles': '../lib/angular-route-styles/route-styles',
      'text': '../lib/requirejs/text'
    },

    shim: {
      'angular': {
        exports: 'angular'
      },
      'angular-route': [
        'angular'
      ],
      'angular-storage': [
        'angular'
      ],
      'route-styles': [
        'angular'
      ],
      'blockly.msg': [
        'blockly.base'
      ],
      'blockly.blocks': [
        'blockly.base',
        'blockly.msg'
      ],
      'blockly': {
        deps: [
          'blockly.base',
          'blockly.blocks',
          'blockly.msg'
        ],
        exports: 'Blockly'
      },
      'blockly.python': [
        'blockly.base',
        'blockly.msg'
      ],
      'jquery.bootstrap': {
        deps: ['jquery']
      }
    },

    deps: [
      './bootstrap'
    ]
  });


})();
