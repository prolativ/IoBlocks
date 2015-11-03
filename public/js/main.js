require.config({
    baseUrl: 'js',

    paths: {
        'app': './app',
        'angular': '../lib/angular/angular',
        'angular-route': '../lib/angular-route/angular-route',
        'domReady': '../lib/requirejs-domready/domReady',
        'blockly.base': '../lib/blockly/blockly_compressed',
        'blockly.blocks': '../lib/blockly/blocks_compressed',
        'blockly.msg': '../lib/blockly/msg/js/en',
        'blockly.python': '../lib/blockly/python_compressed',
        'blockly': '../lib/blockly/blockly-extended',
        'devicesList': 'devices/index',
        'text': '../lib/requirejs/text'
    },

    shim: {
        'angular': {
            exports: 'angular'
        },
        'angular-route': {
            deps: ['angular']
        },
        'blockly.base': {
            exports: 'Blockly'
        },
        'blockly.blocks': [
            'blockly.base',
            'blockly.msg'
        ],
        'blockly.msg': [
            'blockly.base'
        ],
        'blockly.python': [
            'blockly.base'
        ]
    },

    deps: [
        './bootstrap'
    ]
});