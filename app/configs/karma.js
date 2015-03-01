var path = require('path'),
    RewirePlugin = require("rewire-webpack"),
    webpack = require('webpack');

module.exports = function(config) {
  config.set({
    basePath: '',

    frameworks: ['jasmine'],

    files: [
        '../test/**/*spec.js'
    ],

    preprocessors: {
        '../test/**/*.spec.js': ['webpack']
    },

    webpack: {
        resolve: {
            /*
            root: [
                path.resolve('public')
            ],
            */
            extensions: ['', '.js', '.html']
        },

        module : {
            loaders: [
                { test: /\.html$/, loader: 'underscore-template-loader' }
            ],
            postLoaders: [ {
                test: /\.js$/,
                exclude: /(test|node_modules|bower_components)\//,
                loader: 'istanbul-instrumenter'
            }]
        },

        plugins: [
            new webpack.ProvidePlugin({
                $: 'jquery',
                Backbone: 'backbone'
            }),
            new RewirePlugin()
        ]
    },

    webpackMiddleware: {
        stats: {
            colors: true
        }
    },


    // test results reporter to use
    // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
    reporters: ['spec', 'coverage'],

    coverageReporter: {
        type : 'lcovonly',
        dir : '../test',
        subdir : 'coverage'
    },

    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera (has to be installed with `npm install karma-opera-launcher`)
    // - Safari (only Mac; has to be installed with `npm install karma-safari-launcher`)
    // - PhantomJS
    // - IE (only Windows; has to be installed with `npm install karma-ie-launcher`)
    browsers: ['PhantomJS'],


    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 60000,


    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false,


    // List plugins explicitly, since autoloading karma-webpack
    // won't work here
    plugins: [
        require("karma-jasmine"),
        require("karma-coverage"),
        require("karma-webpack"),
        require("karma-spec-reporter"),
        require("karma-phantomjs-launcher")
    ]
  });
};