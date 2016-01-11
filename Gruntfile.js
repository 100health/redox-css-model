

module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-react');
    grunt.loadNpmTasks('grunt-sass');

    grunt.loadNpmTasks('cssmodeling');
    grunt.loadNpmTasks('protodata');

    grunt.loadNpmTasks('grunt-contrib-compass');

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
                'cssmodeling/css_states.json'//,
                //'cssmodeling/js/css_simple.js'
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
    SCSS ( MIMIC ACTUAL COMPILE )
    ==========================*/
    configObj.compass = configObj.compass || {};
    configObj.compass["redox"] = {
      options: {
        sassDir: 'scss',// files here referece files in RedoxEngine_repo
        cssDir: 'dist/styles',
        generatedImagesDir: 'RedoxEngine_repo/ng-app/.tmp/images/generated',
        imagesDir: 'RedoxEngine_repo/ng-app/app/images',
        javascriptsDir: 'RedoxEngine_repo/ng-app/app/scripts',
        fontsDir: 'RedoxEngine_repo/ng-app/app/styles/fonts',
        importPath: 'RedoxEngine_repo/bower_components',// still need to pull CSSModel in project for now...
        httpImagesPath: '/images',
        httpGeneratedImagesPath: '/images/generated',
        httpFontsPath: '/styles/fonts',
        relativeAssets: false,
        assetCacheBuster: false,
        raw: 'Sass::Script::Number.precision = 10\n'
      },
      dist: {
        options: {
          generatedImagesDir: 'assets/images/generated'
        }
      },
      server: {
        options: {
          debugInfo: false
        }
      }
    }



    /*==========================
    Prototype REACT
    ==========================*/
    configObj.react = configObj.react || {};
    configObj.react["redox"] = {files:{}};
    configObj.react["redox"]
        .files['dist/prototype/redox_jsx.js']
            = 'prototype/**/*.jsx';

    configObj.watch = configObj.watch || {};
    configObj.watch["redox"] = {
        files:[
            'RedoxEngine_repo/ng-app/**/*.scss',
            'prototype/**/*.jsx',
            'prototype/**/*.js',
            'prototype/**/*.html'
        ],
        tasks: ["default"]
    };
    configObj.concat = configObj.concat || {};
    configObj.concat["redox_js"] = {files:{}};
    configObj.concat["redox_js"]
        .files['dist/prototype/redox.js']
            = [
                'node_modules/jquery/dist/jquery.min.js',
        		'node_modules/react/dist/react.js',
        		'node_modules/routestate/RouteState.js',
                'node_modules/protodata/client/protodata.js',

                'dist/prototype/redox_jsx.js',
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
            'protodata/**/*.json',
            'prototype/**/*.html'
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
                'dist/styles/components.css'
            ]
        }
    };
    configObj.watch = configObj.watch || {};
    configObj.watch["cssmodeling_components"] = {
        files:[
            'dist/styles/components.css'
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
        /*{
            dest: 'dist/_assets',
            cwd: "scss/_assets",
            src: ["** /*","!** /*.sketch"],
            expand: true
        },*/
        // don't forget the style guide as well...could be done via scss config too...
        {
            dest: 'dist/csscore/_assets',
            cwd: "scss/_assets",
            src: ["**/*","!**/*.sketch"],
            expand: true
        },
        {
            dest: 'dist/images/',
            cwd: "RedoxEngine_repo/ng-app/app/images/",
            src: ["**/*","!**/*.sketch"],
            expand: true
        },
        {
            dest: 'dist/fonts',
            cwd: "RedoxEngine_repo/ng-app/app/fonts",
            src: ["**/*"],
            expand: true
        }
    ]};

    grunt.initConfig( configObj );

    // 'build' was put together in processProjects
    grunt.registerTask( 'default' , [
        'compass',
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
