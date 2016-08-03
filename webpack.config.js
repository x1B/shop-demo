/* eslint-env node */

const path = require( 'path' );
const webpack = require( 'webpack' );

module.exports = {
   entry: {
      'app': './init.js',
      'vendor': [ 'react', 'angular', 'laxar' ]
   },

   output: {
      path: path.resolve( './var/flows/main/dist' ),
      publicPath: '/var/flows/main/dist/',
      filename: '[name].bundle.js'
   },
   plugins: [
      new webpack.optimize.CommonsChunkPlugin( 'vendor', 'vendor.bundle.js' ),
      new webpack.SourceMapDevToolPlugin( {
         filename: '[name].bundle.js.map'
      } )
   ],

   _distOutput: {
      path: path.resolve( './var/flows/main/dist' ),
      publicPath: '/var/flows/main/dist/',
      filename: '[name].bundle.min.js'
   },
   _distPlugins: [
      // make react happy
      new webpack.DefinePlugin( {
         'process.env': {
            'NODE_ENV': JSON.stringify( 'production' )
         }
      } ),
      new webpack.optimize.CommonsChunkPlugin( 'vendor', 'vendor.bundle.min.js' ),
      new webpack.optimize.DedupePlugin(),
      new webpack.SourceMapDevToolPlugin( {
         filename: '[name].bundle.min.js.map'
      } ),
      new webpack.optimize.UglifyJsPlugin( {
         compress: {
            warnings: false
         },
         sourceMap: true
      } )
   ],

   resolve: {
      root: [
         path.resolve( './includes/lib' ),
         path.resolve( './includes/controls' ),
         path.resolve( './node_modules' ),
         path.resolve( './bower_components' )
      ],
      extensions: [ '', '.js', '.jsx' ],
      alias: {
         'page': path.resolve( './bower_components/page/page' ),
         'fast-json-patch': path.resolve( './bower_components/fast-json-patch/src/json-patch' ),
         'moment': path.resolve( './bower_components/moment/moment' ),

         'laxar': path.resolve( './includes/lib/laxar/laxar' ),
         // uncomment to test compatibility mode:
         //'laxar': path.resolve( './includes/lib/laxar/laxar-compatibility' ),
         // uncomment to test the dist version of laxar:
         //'laxar': path.resolve( './includes/lib/laxar/dist/laxar' ),
         jquery: 'jquery/dist/jquery',

         'laxar-react-adapter': path.resolve( './includes/lib/laxar-react-adapter/laxar-react-adapter' ),
         'laxar-angular-adapter': path.resolve(
            './includes/lib/laxar-angular-adapter'
         ),
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
         /bower_components\/react\/react.js/,
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
