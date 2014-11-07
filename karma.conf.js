'use strict';

module.exports = function(config) {

  config.set({
    
    basePath : '',

    files : [
        'test/spec/**/*.js'
    ],

    autoWatch : false,

    frameworks: ['jasmine'],

    browsers : ['PhantomJS'],

    plugins : [
        'karma-phantomjs-launcher',
        'karma-jasmine'
    ]
  });

};
