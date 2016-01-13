

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
                // 'cssmodeling/_resets/**/*.css'
            ],
            type:"scss",
            var_prefix:"v-"
        }
    };

    configObj.copy = configObj.copy || {};
    configObj.copy["cssmodeling"] = {files:[
        // this fakes a bower update in the main repo....careful!
        {
            dest: 'RedoxEngine_repo/bower_components/redox-css-model/dist/csscore',
            cwd: "dist/csscore",
            src: ["**/*"],
            expand: true
        }
    ]};
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
    // Just too slow...using libsass instead for prototyping
    /*configObj.compass = configObj.compass || {};
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
    }*/

    configObj.sass = configObj.sass || {};
    configObj.sass["redox"] = {files:{}};
    configObj.sass["redox"]
        .files['dist/styles/main.css'] =
            [
                'scss/main.scss'
            ];
    configObj.sass['redox'].options = {
        includePaths: ["RedoxEngine_repo/bower_components"],
        precision: 10
    };

    // need a specific component css file for style guide....
    configObj.sass = configObj.sass || {};
    configObj.sass["redox_components"] = {files:{}};
    configObj.sass["redox_components"]
        .files['dist/styles/components.css'] =
            [
                'scss/components.scss'
            ];
    configObj.sass['redox_components'].options = {
        includePaths: ["RedoxEngine_repo/bower_components"],
        precision: 10
    };

    // pull together bower styles as well...
    configObj.concat = configObj.concat || {};
    configObj.concat["redox_bower"] = {files:{}};
    configObj.concat["redox_bower"]
        .files['dist/styles/vendor.css']
            = [
                "RedoxEngine_repo/bower_components/chosen/chosen.min.css",
                "RedoxEngine_repo/bower_components/angular-motion/dist/angular-motion.css",
                "RedoxEngine_repo/bower_components/perfect-scrollbar/src/perfect-scrollbar.css",
                "RedoxEngine_repo/bower_components/spectrum/spectrum.css",
                "RedoxEngine_repo/bower_components/sweetalert/dist/sweetalert.css",
                "RedoxEngine_repo/bower_components/angular-xeditable/dist/css/xeditable.css",
                "RedoxEngine_repo/bower_components/fontawesome/css/font-awesome.css",
                "RedoxEngine_repo/bower_components/ionicons/css/ionicons.css",
                "RedoxEngine_repo/bower_components/ng-cropper/dist/ngCropper.all.css",
                "RedoxEngine_repo/bower_components/bootstrap/dist/css/bootstrap.css",
                "RedoxEngine_repo/bower_components/rui-components/dst/styles/main.min.css",
                "RedoxEngine_repo/bower_components/json-formatter/dist/json-formatter.css",
            ];


    configObj.watch = configObj.watch || {};
    configObj.watch["redox_scss"] = {
        files:[
            'RedoxEngine_repo/ng-app/**/*.scss',
            "sass/**.*.scss"
        ],
        tasks: ["sass"]
    };


    /*==========================
    Prototype REACT
    ==========================*/
    configObj.react = configObj.react || {};
    configObj.react["redox"] = {files:{}};
    configObj.react["redox"]
        .files['dist/prototype/redox_jsx.js']
            = 'prototype/**/*.jsx';

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

    configObj.watch = configObj.watch || {};
    configObj.watch["redox"] = {
        files:[
            'prototype/**/*.jsx',
            'prototype/**/*.js',
            'prototype/**/*.html'
        ],
        tasks: ["default"]
    };

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
        // don't forget the style guide as well...could be done via scss config too...
        // images happen to be reachable without redundant versions....
        /*{
            dest: 'dist/csscore/_assets',
            cwd: "scss/_assets",
            src: ["** /*","!** /*.sketch"],
            expand: true
        },*/
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
        },
        // this fakes a bower update in the main repo....careful!
        {
            dest: 'RedoxEngine_repo/bower_components/redox-css-model/dist/csscore',
            cwd: "dist/csscore",
            src: ["**/*"],
            expand: true
        }
    ]};


    grunt.initConfig( configObj );

    // 'build' was put together in processProjects
    grunt.registerTask( 'default' , [
        'sass',
        'react:redox',
        'concat:redox_js',
        'copy:redox'
    ]);

    grunt.registerTask( 'full' , [
        'cssmodeling:redox',
        'cssmodeling_components:redox',
        'concat:redox_bower',
        'copy:cssmodeling',
        'default',// doesn't seem to trigger when it is last...
        'protodata:redox'
    ]);

}
