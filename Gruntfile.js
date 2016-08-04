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
         'main-develop':
            webpackConfig,
         'main-dist':
            Object.assign( {}, webpackConfig, {
               output: webpackConfig._distOutput,
               plugins: webpackConfig._distPlugins
            } )
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
      },
      concurrent: {
         'develop-main': {
            tasks: [
               'laxar-develop-no-watch',
               'webpack-dev-server:start'
            ],
            options: {
               logConcurrentOutput: true
            }
         }
      }
   } );

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   grunt.loadNpmTasks( 'grunt-concurrent' );
   grunt.loadNpmTasks( 'grunt-laxar' );
   grunt.loadNpmTasks( 'grunt-webpack' );

   // basic aliases
   grunt.registerTask( 'test', [ 'laxar-test' ] );
   grunt.registerTask( 'build', [ 'laxar-build', 'webpack:main-develop' ] );
   grunt.registerTask( 'develop', [ 'concurrent:develop-main' ] );
   grunt.registerTask( 'info', [ 'laxar-info' ] );
   grunt.registerTask( 'dist', [ 'laxar-configure', 'laxar-dist-css', 'webpack:main-dist' ] );

   // additional (possibly) more intuitive aliases
   grunt.registerTask( 'optimize', [ 'dist' ] );
   grunt.registerTask( 'start', [ 'develop' ] );

   grunt.registerTask( 'default', [ 'build', 'test' ] );
};
