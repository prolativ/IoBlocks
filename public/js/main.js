require.config({
    baseUrl: 'js',

    paths: {
        'app': './app',
        'angular': '../lib/angular/angular',
        'angular-route': '../lib/angular-route/angular-route',
        'route-styles': '../lib/angular-route-styles/route-styles',
        'domReady': '../lib/requirejs-domready/domReady',
        'blockly.base': '../lib/blockly/blockly_compressed',
        'blockly.blocks': '../lib/blockly/blocks_compressed',
        'blockly.msg': '../lib/blockly/msg/js/en',
        'blockly.python': '../lib/blockly/python_compressed',
        'blockly': './blockly-extended',
        'copernicus.commons': './devices/copernicus/commons',
        'copernicus.blockly.blocks': './devices/copernicus/blocklyBlocks',
        'copernicus.blockly.generators': './devices/copernicus/blocklyGenerators',
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
        'route-styles': {
            deps: ['angular']
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
        ],
        'copernicus.commons': [
            'blockly.base'
        ],
        'copernicus.blockly.blocks': [
            'copernicus.commons',
            'blockly.blocks'
        ],
        'copernicus.blockly.generators': [
            'copernicus.commons',
            'blockly.python'
        ],
        'blockly': {
            deps: [
                'blockly.msg',
                'copernicus.blockly.blocks',
                'copernicus.blockly.generators'
            ],
            exports: 'Blockly'
        }
    },

    deps: [
        './bootstrap'
    ]
});