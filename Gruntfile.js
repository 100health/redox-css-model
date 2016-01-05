

module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-react');
    grunt.loadNpmTasks('grunt-sass');

    grunt.loadNpmTasks('cssmodeling');
    grunt.loadNpmTasks('protodata');

    var configObj = {
        pkg: '<json:package.json>'
    };


    /*==========================
    CSSMODELING
    ==========================*/
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

    configObj.watch = configObj.watch || {};
    configObj.watch["cssmodeling"] = {
        files:[
            'cssmodeling/**/*.json'
        ],
        tasks: ["full"]
    };
    /*==========================
    END CSSMODELING
    ==========================*/



    /*==========================
    SCSS
    ==========================*/
    configObj.concat = configObj.concat || {};
    configObj.concat["redox_scss"] = {files:{}};
    configObj.concat["redox_scss"]
        .files['dist/redox.scss'] =
            [
                'dist/csscore/scss/_core_mixins.scss',

                'scss/_shared/contentHeader/o-contentHeader.scss',
                'scss/_shared/**/*.scss',
                'scss/organziation/cropPlans/footerNav/**/*.scss',
                'scss/**/*.scss'
            ];

    configObj.sass = configObj.sass || {};
    configObj.sass["redox"] = {files:{}};
    configObj.sass["redox"]
        .files['dist/redox.css'] =
            [
                'dist/redox.scss'
            ];

    /*==========================
    Prototype REACT
    ==========================*/
    configObj.react = configObj.react || {};
    configObj.react["redox"] = {files:{}};
    configObj.react["redox"]
        .files['dist/redox_jsx.js']
            = 'prototype/**/*.jsx';

    configObj.watch = configObj.watch || {};
    configObj.watch["redox"] = {
        files:[
            'scss/**/*.scss',
            'prototype/**/*.jsx',
            'prototype/**/*.js',
            'prototype/**/*.html'
        ],
        tasks: ["default"]
    };
    configObj.concat = configObj.concat || {};
    configObj.concat["redox_js"] = {files:{}};
    configObj.concat["redox_js"]
        .files['dist/redox.js']
            = [
                'node_modules/jquery/dist/jquery.min.js',
        		'node_modules/react/dist/react.js',
        		'node_modules/routestate/RouteState.js',
                'node_modules/protodata/client/protodata.js',

                'dist/redox_jsx.js',
                'prototype/**/*.js'
            ];

    /*==========================
    ProtoData
    ==========================*/
    configObj.protodata = configObj.protodata || {};
    configObj.protodata["redox"] = {files:{}};
    configObj.protodata["redox"]
        .files['dist/protodata/redox_data.json']
            = ['protodata/RedoxData.js'];
    configObj.protodata["redox"]
        .options = {
            databases:{}
        };

    configObj.watch = configObj.watch || {};
    configObj.watch["protodata"] = {
        files:[
            'protodata/**/*.js',
            'protodata/**/*.json'
        ],
        tasks: ["protodata:redox"]
    };


    /*==========================
    CSSMODELING
    ==========================*/
    configObj.cssmodeling = configObj.cssmodeling || {};
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
    configObj.watch["cssmodeling_components"] = {
        files:[
            'dist/redox.css'
        ],
        tasks: ["cssmodeling_components:redox"]
    };
    /*==========================
    END CSSMODELING
    ==========================*/

    /*=============================
    COPY (push index into dist...make a compact portable whole)
    =============================*/
    configObj.copy = configObj.copy || {};
    configObj.copy["redox"] = {files:[
        {
            dest: 'dist/',
            cwd: "prototype/",
            src: "index.html",
            expand: true
        },
        // compile images directly to dist...
        {
            dest: 'dist/_assets',
            cwd: "scss/_assets",
            src: ["**/*","!**/*.sketch"],
            expand: true
        },
        // don't forget the style guide as well...could be done via scss config too...
        {
            dest: 'dist/csscore/_assets',
            cwd: "scss/_assets",
            src: ["**/*","!**/*.sketch"],
            expand: true
        }
    ]};

    grunt.initConfig( configObj );

    // 'build' was put together in processProjects
    grunt.registerTask( 'default' , [
        'concat:redox_scss',
        'sass:redox',
        'react:redox',
        'concat:redox_js',
        'copy:redox'
    ]);

    grunt.registerTask( 'full' , [
        'cssmodeling:redox',
        'cssmodeling_components:redox',
        'default',// doesn't seem to trigger when it is last...
        'protodata:redox'
    ]);

}
