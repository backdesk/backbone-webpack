var webpack  = require('webpack');
    wpConfig = require("./app/configs/webpack");

module.exports = function(grunt) {
  grunt.initConfig({
    /**
     * Branch out to Karma config for unit tests and code coverage.
     */
    karma: {
      ci : {
        configFile : './app/configs/karma.js',
        singleRun : true
      }
    },

    webpack : {
      /**
       * Bring in the main config. Possible path scoping issues.
       */
      options : wpConfig,

      /**
       * Used as a production step to optimize and minify source.
       */
      build : {
        plugins : wpConfig.plugins.concat(
          new webpack.optimize.DedupePlugin(),
          new webpack.optimize.UglifyJsPlugin({
            compress : true,
            output : {
              comments : false
            }
          })
        )
      },

      /**
       * Development only options. Source maps aren't strictly necessary here.
       */
      "build-dev" : {
        devtool : "sourcemap",
        debug : true,
      }
    },

    /**
     * SASS Compilation.
     */
    sass: {
      dist : {
        files: {
          'app/styles/main.css' : 'app/styles/scss/main.scss'
        }
      }
    },

    /**
     * Watch on all specified file types.
     */
    watch: {
      options: {
        spawn: false,
      },

      app : {
        files : ['app/**/*.js', 'appc/**/*.html'],
        tasks : ['webpack:build-dev'],
      },

      css : {
        files : ['app/**/*.scss'],
        tasks : ['sass']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-webpack');

  grunt.registerTask('default', ['watch']);
  grunt.registerTask("build", ["karma:ci","webpack:build"]);
};