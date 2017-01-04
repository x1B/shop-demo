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
      publicPath: '/var/build/',
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
      extensions: [ '', '.js', '.jsx', '.ts', '.tsx' ],
      alias: {
         'polyfills': path.resolve( './includes/lib/laxar/dist/polyfills.js' ),
         'laxar-types': path.resolve( './includes/lib/laxar-angular2-adapter/types.ts' ),
         'laxar-uikit': path.resolve( './includes/lib/laxar-uikit' ),
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
            test: /.spec.jsx?$/,
            exclude: /(node_modules|bower_components)/,
            loader: './includes/lib/laxar-mocks/spec-loader'
         },

         {  // load styles, images and fonts with the file-loader
            // (out-of-bundle in var/build/assets/)
            test: /\.(gif|jpe?g|png|ttf|woff2?|svg|eot|otf)(\?.*)?$/,
            loader: 'file-loader'
         },
         {  // ... after optimizing graphics with the image-loader ...
            test: /\.(gif|jpe?g|png|svg)$/,
            loader: 'img-loader?progressive=true'
         },
         {  // ... and resolving CSS url()s with the css loader
            // (extract-loader extracts the CSS string from the JS module returned by the css-loader)
            test: /\.(css|s[ac]ss)$/,
            loader: 'style-loader!css-loader'
         },
         {  // load scss files by precompiling with the sass-loader
            test: /\/default.theme\/.*\.s[ac]ss$/,
            loader: 'sass-loader'
         },
         {  // use a different config for the cube theme to have the correct style include-path
            test: /\/cube\.theme\/.*\.s[ac]ss$/,
            loader: 'sass-loader?config=sassLoaderCube'
         },
         {
            test: /\.tsx?$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'ts-loader'
         }
      ]
   },
   fileLoader: {
      name: 'assets/[name]-[sha1:hash:hex:6].[ext]'
   },
   sassLoader: {
      includePaths: [
         './includes/lib/laxar-uikit/themes/default.theme/scss',
         './includes/lib/laxar-uikit/scss',
         './includes/lib/compass/core/stylesheets',
         './bower_components/bootstrap-sass-official/assets/stylesheets',
         './bower_components'
      ].map( p => path.resolve( __dirname, p ) )
   },
   sassLoaderCube: {
      includePaths: [
         './includes/themes/cube.theme/scss',
         './includes/lib/laxar-uikit/themes/default.theme/scss',
         './includes/lib/laxar-uikit/scss',
         './includes/lib/compass/core/stylesheets',
         './bower_components/bootstrap-sass-official/assets/stylesheets',
         './bower_components'
      ].map( p => path.resolve( __dirname, p ) )
   }
};
