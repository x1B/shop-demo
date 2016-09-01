/**
 * Copyright 2016 aixigo AG
 * Released under the MIT license.
 * http://laxarjs.org/license
 */
/* eslint-env node */

const path = require( 'path' );
const webpack = require( 'webpack' );

const basePlugins = [
   new webpack.ResolverPlugin( [
      new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin( 'package.json', [ 'browser', 'main' ] ),
      new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin( 'bower.json', [ 'main' ] )
   ] )
];

module.exports = {
   entry: {
      'app': './init.js',
      'vendor': [ 'polyfills', 'react', 'jquery', 'angular', 'laxar', 'laxar-angular-adapter' ]
   },

   output: {
      path: path.resolve( './var/build/' ),
      publicPath: '/var/build',
      filename: '[name].bundle.js'
   },

   basePlugins,
   plugins: basePlugins.concat( [
      new webpack.optimize.CommonsChunkPlugin( 'vendor', 'vendor.bundle.js' ),
      new webpack.SourceMapDevToolPlugin( {
         filename: '[name].bundle.js.map'
      } )
   ] ),

   resolve: {
      root: [
         path.resolve( './includes/lib' ),
         path.resolve( './node_modules' ),
         path.resolve( './bower_components' )
      ],
      extensions: [ '', '.js', '.jsx' ],
      alias: {
         'polyfills': path.resolve( './includes/lib/laxar/polyfills.js' ),
         'default.theme': path.resolve( './includes/lib/laxar-uikit/themes/default.theme' )
      }
   },

   module: {
      noParse: [
         /bower_components\/page\/page.js/,
         /bower_components\/angular*\/*.js/
      ],
      loaders: [
         {
            test: /\.jsx?$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel-loader'
         },
         {
            test: /\.png$/,
            exclude: /(node_modules|bower_components|spec)/,
            loader: 'file-loader'
         },
         {
            test: /.spec.jsx?$/,
            exclude: /(node_modules|bower_components)/,
            loader: './includes/lib/laxar-mocks/spec-loader'
         }
      ]
   }
};
