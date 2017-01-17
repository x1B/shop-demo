/**
 * Copyright 2016 aixigo AG
 * Released under the MIT license.
 * http://laxarjs.org/license
 */
/* eslint-env node */

const path = require( 'path' );
const webpack = require( 'webpack' );

const ExtractTextPlugin = require( 'extract-text-webpack-plugin' );

const nodeEnv = process.env.NODE_ENV;
const isProduction = nodeEnv === 'production';
const isBrowserSpec = nodeEnv === 'browser-spec';
const processPlugins = isProduction ?
   productionPlugins :
   isBrowserSpec ? browserSpecPlugins : _ => _;

const publicPath = isProduction ? '/var/dist/' : '/var/build/';

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

const config = {
   entry: {
      'app': './init.js',
      'vendor': [ 'polyfills', 'react', 'jquery', 'angular', 'laxar', 'laxar-angular-adapter' ]
   },

   output: {
      path: path.resolve( `./${publicPath}` ),
      publicPath,
      filename: isProduction ? '[name].bundle.min.js' : '[name].bundle.js'
   },

   plugins: processPlugins([
      new webpack.optimize.CommonsChunkPlugin( { name: 'vendor' } ),
      new webpack.SourceMapDevToolPlugin( { filename: '[name].bundle.js.map' } ),
      // For React
      new webpack.DefinePlugin( { 'process.env': { 'NODE_ENV': JSON.stringify( nodeEnv ) } } ),
      // For Angular 2
      new webpack.ContextReplacementPlugin(
         /angular[/\\]core[/\\](esm[/\\]src|src)[/\\]linker/,
         path.resolve( './includes' ), // location of your src
         {} // a map of your routes
        )
   ]),

   resolve: {
      descriptionFiles: [ 'package.json', 'bower.json' ],
      modules: [
         path.resolve( './includes/lib' ),
         path.resolve( './node_modules' ),
         path.resolve( './bower_components' )
      ],
      extensions: [ '.js', '.jsx', '.ts', '.tsx' ],
      alias: {
         'polyfills': path.resolve( './includes/lib/laxar/dist/polyfills.js' ),
         'laxar-types': path.resolve( './includes/lib/laxar-angular2-adapter/types.ts' ),
         'laxar-uikit': path.resolve( './includes/lib/laxar-uikit' ),
         'default.theme': path.resolve( './includes/lib/laxar-uikit/themes/default.theme' )
      }
   },

   module: {
      noParse: [
         /bower_components[/\\]page[/\\]page.js/,
         /bower_components[/\\]angular*[/\\]*.js/
      ],
      rules: [
         {
            test: /\.jsx?$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel-loader'
         },
         {
            test: /.spec.(jsx?|tsx?)$/,
            exclude: /(node_modules|bower_components)/,
            loader: './includes/lib/laxar-mocks/spec-loader'
         },

         {  // load styles, images and fonts with the file-loader
            // (out-of-bundle in var/build/assets/)
            test: /\.(gif|jpe?g|png|ttf|woff2?|svg|eot|otf)(\?.*)?$/,
            loader: 'file-loader',
            options: {
               name: 'assets/[name]-[sha1:hash:hex:6].[ext]'
            }
         },
         {  // ... after optimizing graphics with the image-loader ...
            test: /\.(gif|jpe?g|png|svg)$/,
            loader: 'img-loader?progressive=true'
         },
         {  // ... and resolving CSS url()s with the css loader
            // (extract-loader extracts the CSS string from the JS module returned by the css-loader)
            test: /\.(css|s[ac]ss)$/,
            loader: isProduction ?
               ExtractTextPlugin.extract( { fallbackLoader: 'style-loader', loader: 'css-loader' } ) :
               'style-loader!css-loader'
         },
         {  // load scss files by precompiling with the sass-loader
            test: /\/default.theme\/.*\.s[ac]ss$/,
            loader: 'sass-loader',
            options: {
               includePaths: [
                  'laxar-uikit/themes/default.theme/scss',
                  'laxar-uikit/scss',
                  'bootstrap-sass/assets/stylesheets',
                  './bower_components'
               ].map( p => path.resolve( __dirname, p ) )
            }
         },
         {  // use a different config for the cube theme to have the correct style include-path
            test: /\/cube\.theme\/.*\.s[ac]ss$/,
            loader: 'sass-loader?config=sassLoaderCube',
            options: {
               includePaths: [
                  './includes/themes/cube.theme/scss',
                  'laxar-uikit/themes/default.theme/scss',
                  'laxar-uikit/scss',
                  'bootstrap-sass/assets/stylesheets',
                  './bower_components'
               ].map( p => path.resolve( __dirname, p ) )
            }
         },
         {
            test: /\.tsx?$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'ts-loader'
         }
      ]
   }
};

if( isBrowserSpec ) {
   const WebpackJasmineHtmlRunnerPlugin = require( 'webpack-jasmine-html-runner-plugin' );
   config.entry = WebpackJasmineHtmlRunnerPlugin.entry(
      './includes/widgets/shop-demo/article-browser-widget/spec/*.spec.js'
   );
   config.output = {
      path: path.resolve( path.join( process.cwd(), 'spec-output' ) ),
      publicPath: '/spec-output/',
      filename: '[name].bundle.js'
   };
}

module.exports = config;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

function productionPlugins( plugins ) {
   return plugins.concat( [
      new webpack.SourceMapDevToolPlugin( { filename: '[name].bundle.min.js.map' } ),
      // TODO: this should be enabled, but it seems to break Angular 2.
      // new webpack.optimize.UglifyJsPlugin( {
      //    compress: { warnings: false },
      //    sourceMap: true
      // } ),
      new ExtractTextPlugin( { filename: '[name].bundle.css' } )
   ] );
}

function browserSpecPlugins() {
   const WebpackJasmineHtmlRunnerPlugin = require( 'webpack-jasmine-html-runner-plugin' );
   return [
      new webpack.SourceMapDevToolPlugin( { filename: '[name].bundle.js.map' } ),
      new WebpackJasmineHtmlRunnerPlugin()
   ];
}
