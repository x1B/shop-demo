/* eslint-env node */

const path = require( 'path' );
const webpack = require( 'webpack' );

const basePlugins = [
   new webpack.ResolverPlugin( [
      new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin( 'package.json', [ 'main' ] ),
      new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin( 'bower.json', [ 'main' ] )
   ] )
];

module.exports = {
   entry: {
      'app': './init.js',
      'vendor': [ 'react', 'jquery', 'angular', 'laxar' ]
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
         'polyfills': path.resolve( './includes/lib/laxar/dist/polyfills.js' ),
         'laxar-application': path.resolve( __dirname ),
         'laxar-application-dependencies': './var/flows/main/dependencies',

         'laxar-path-root': '.',
         'laxar-path-flows': './application/flows',
         'laxar-path-default-theme': './includes/lib/laxar-uikit/themes/default.theme',
         'laxar-path-layouts': './application/layouts',
         'laxar-path-pages': './application/pages',
         'laxar-path-widgets': './includes/widgets',
         'laxar-path-controls': './includes/controls',
         'laxar-path-themes': './includes/themes'
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
            exclude: /(node_modules|bower_components|spec)/,
            loader: 'babel-loader'
         },
         {
            test: /\.png$/,
            exclude: /(node_modules|bower_components|spec)/,
            loader: 'file-loader'
         }
      ]
   }
};
