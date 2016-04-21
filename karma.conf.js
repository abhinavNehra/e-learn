// Karma configuration
// Generated on Thu Feb 04 2016 10:59:32 GMT+0530 (IST)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
        "public/assets/js/jquery-1.12.0.min.js",
        "public/assets/js/angular.min.js",
        "public/assets/js/angular-mocks.js",
        "public/assets/js//angular-ui-router.js",
        "public/app/config.js",
        "public/assets/js/masonry.pkgd.min.js",
        "public/assets/js/imagesloaded.pkgd.js",
        "public/assets/js/aws-sdk-2.2.39.min.js",
        "public/assets/js/amazon-cognito.min.js",
        "public/assets/js/angular-messages.js",
        "public/assets/js/angular-animate.js",
        "public/assets/js/ui-bootstrap-tpls-1.1.2.js",
        "public/assets/js/angular-resource-1.0.0rc6.min.js",
        "public/app/app.module.js",
        "public/app/app.routes.js",
        "public/assets/js/angular-file-model.js",
        "public/app/constants.js",
        "public/assets/js/ng-infinite-scroll.min.js",
        "public/app/factories/*.js",
        "public/app/components/**/*.js",
        "public/app/shared/**/*.js",
        "test/frontend/mock/*.js",
        "test/frontend/js/controllers/**/*.js"
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
        "public/app/components/**/*.js": ['coverage'],
        "public/app/app.module.js" : ['coverage'],
        "public/app/config.js" : ['coverage'],
        "public/app/shared/**/*.js" : ['coverage']
    },
    


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    coverageReporter: {
      dir: 'coverage/reports/coverage',
      reporters: [
        { type: 'html', subdir: 'report-html' },
        { type: 'cobertura', subdir: 'cobertura' }
      ]
    }
  })
}