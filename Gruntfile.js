/**
 * Copyright 2015 Alexander Wilden
 * Released under the MIT license
 */
 /* global module require */
module.exports = function(grunt) {
   'use strict';

   const serverPort = 8101;
   const testPort = 1000 + serverPort;
   const liveReloadPort = 30000 + serverPort;

   const webpackConfig = require('./webpack.config');
   const webpackConfigDist = require('./webpack.config.dist');

   grunt.initConfig( {
      pkg: grunt.file.readJSON('package.json'),

      'laxar-configure': {
         options: {
            flows: [
               {
                  target: 'main',
                  src: 'application/flows/main.json'
               }
            ],
            ports: {
               develop: serverPort,
               test: testPort,
               livereload: liveReloadPort
            }
         }
      },
      connect: {
         options: {
            protocol: 'http'
         }
      },

      webpack: {
         'main-develop': webpackConfig,
         'main-dist': webpackConfigDist
      },

      'webpack-dev-server': {
         options: {
            webpack: webpackConfig,
            publicPath: webpackConfig.output.publicPath,
            port: 8100
         },
         start: {
            keepAlive: true,
            webpack: {
               devtool: 'eval',
               debug: true
            }
         }
      }
   } );

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   grunt.loadNpmTasks( 'grunt-laxar' );
   grunt.loadNpmTasks( 'grunt-webpack' );

   // basic aliases
   grunt.registerTask( 'build', [ 'webpack:main-develop' ] );
   grunt.registerTask( 'develop', [ 'webpack-dev-server' ] );
   grunt.registerTask( 'dist', [ 'laxar-configure', 'laxar-build', 'laxar-dist-css', 'webpack:main-dist' ] );
   grunt.registerTask( 'test', [ 'laxar-test' ] );
   grunt.registerTask( 'info', [ 'laxar-info' ] );

   // additional (possibly) more intuitive aliases
   grunt.registerTask( 'optimize', [ 'dist' ] );
   grunt.registerTask( 'start', [ 'develop' ] );

   grunt.registerTask( 'default', [ 'build', 'test' ] );
};
