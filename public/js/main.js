require.config({
    baseUrl: 'js',

    paths: {
        'app': './app',
        'angular': '../lib/angular/angular',
        'angular-route': '../lib/angular-route/angular-route',
        'domReady': '../lib/requirejs-domready/domReady',
        'blockly': '../lib/blockly/blockly_compressed',
        'blockly.blocks': '../lib/blockly/blocks_compressed',
        'blockly.msg': '../lib/blockly/msg/js/en',
        'blockly.python': '../lib/blockly/python_compressed',
        'blockly.copernicus.blocks': '../lib/blockly/blocks/copernicus',
        'blockly.copernicus.python': '../lib/blockly/generators/python/copernicus'
    },

    shim: {
        'angular': {
            exports: 'angular'
        },
        'angular-route': {
            deps: ['angular']
        },
        'blockly': {
            exports: 'Blockly'
        },
        'blockly.blocks': [
            'blockly'
        ],
        'blockly.msg': [
            'blockly'
        ],
        'blockly.python': [
            'blockly'
        ],
        'blockly.copernicus.blocks': [
            'blockly',
            'blockly.blocks'
        ],
        'blockly.copernicus.python': [
            'blockly',
            'blockly.python'
        ]
    },

    deps: [
        './bootstrap'
    ]
});