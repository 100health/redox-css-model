module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-react');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('cssmodeling');
    grunt.loadNpmTasks('protodata');

    var configObj = {
        pkg: '<json:package.json>'
    };


    /*==========================
    ProtoData
    ==========================*/
    configObj.protodata = configObj.protodata || {};
    configObj.protodata["redox"] = {
        files: {
            'dist/protodata/redox_data.json':['protodata/Redox.js']
        },
        options: {
            databases:{}
        }
    }
    configObj.watch = configObj.watch || {};
    configObj.watch["protodata"] = {
        files:[
            'protodata/Redox.js'
        ],
        tasks: ["protodata:redox"]
    };

    /* ====================SCSS======================== */
    configObj.concat = configObj.concat || {};
    configObj.concat["redox"] = {
        files: {
            'dist/redox.scss':
            [
                'dist/csscore/scss/_core_mixins.scss',
                'prototype/v01_00/_shared/**/*.scss',
                'prototype/v01_00/**/*.scss'
            ]
        }
    };

    configObj.sass = configObj.sass || {};
    configObj.sass["redox"] = {
        files: {
            'dist/redox.css':
            [
                'dist/redox.scss'
            ]
        }
    };

    configObj.watch = configObj.watch || {};
    configObj.watch["scss"] = {
        files:[
            'prototyping/**/*.scss'
        ],
        tasks: ["default"]
    };

    /*==========================
    Prototype REACT
    ==========================*/
    configObj.react = configObj.react || {};
    configObj.react["redox"] = {files:{}}
    configObj.react["redox"].files['dist/redox_jsx.js']
                                        = 'prototype/v01_00/**/*.jsx';
    configObj.watch = configObj.watch || {};
    configObj.watch["react"] = {
        files:[
            'prototype/v01_00/**/*.jsx',
            'prototype/v01_00/**/*.scss',
            'prototype/v01_00/**/*.js'
        ],
        tasks: ["default"]
    };
    configObj.concat = configObj.concat || {};
    configObj.concat["redox_js"] = {
        files: {
            'dist/redox.js':
            [
                'node_modules/jquery/dist/jquery.min.js',
        		'node_modules/react/dist/react.js',
        		'node_modules/routestate/RouteState.js',

                'dist/redox_jsx.js',
                'prototype/**/*.js'
            ]
        }
    };

    /*================ CSSMODELING =============*/
    configObj.cssmodeling = configObj.cssmodeling || {};
    configObj.cssmodeling["redox"] = {
        files: {
            'dist/csscore':
            [
                'cssmodeling/css_schemes.json',

                'cssmodeling/systems/css_rows_quartered.json',
                'cssmodeling/systems/css_12_col_vw_quartered.json',
                'cssmodeling/skins/css_redox_skin.json',
                'cssmodeling/systems/css_simple.json',

                'cssmodeling/css_states.json'
            ]
        },
        options: {
            resets:[
                'cssmodeling/_resets/**/*.css'
            ],
            type:"scss",
            var_prefix:"v-"
        }
    };
    configObj.cssmodeling_components = configObj.cssmodeling_components || {};
    configObj.cssmodeling_components["redox"] = {
        files: {
            'dist/csscore':
            [
                'dist/redox.css'
            ]
        }
    };

    configObj.watch = configObj.watch || {};
    configObj.watch["cssmodeling"] = {
        files:[
            'cssmodeling/**/*.json',
            'cssmodeling/**/*.css'
        ],
        tasks: ["full"]
    };configObj.watch["cssmodeling_components"] = {
        files:[
            'dist/redox.css'
        ],
        tasks: ["cssmodeling_components:redox"]
    };
/*=============== CSSMODELING =============*/


    grunt.initConfig( configObj );

    // 'build' was put together in processProjects
    grunt.registerTask( 'default' , [
        'concat:redox',
        'sass:redox',
        'react:redox',
        'concat:redox_js'
    ]);

    grunt.registerTask( 'full' , [
        'cssmodeling:redox',
        'cssmodeling_components:redox',
        'default'
    ]);

}
