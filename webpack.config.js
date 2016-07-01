/* eslint-env node */

const path = require( 'path' );
const webpack = require( 'webpack' );

module.exports = {
   entry: {
      'app': './init.js',
      'vendor': [ 'react', 'angular' ]
   },

   output: {
      path: path.resolve( './var/flows/main/dist' ),
      publicPath: '/var/flows/main/dist/',
      filename: '[name].bundle.js',
   },
   plugins: [
      new webpack.optimize.CommonsChunkPlugin( 'vendor', 'vendor.bundle.js' ),
      new webpack.SourceMapDevToolPlugin( {
         filename: '[name].bundle.js.map'
      } ),
   ],

   _distOutput: {
      path: path.resolve( './var/flows/main/dist' ),
      publicPath: '/var/flows/main/dist/',
      filename: '[name].bundle.min.js'
   },
   _distPlugins: [
      new webpack.optimize.CommonsChunkPlugin( 'vendor', 'vendor.bundle.min.js' ),
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
         path.resolve( './includes/lib/' ),
         path.resolve( './bower_components' )
      ],
      extensions: [ '', '.js', '.jsx' ],
      alias: {
         'page': path.resolve( './bower_components/page/page' ),
         'fast-json-patch': path.resolve( './bower_components/fast-json-patch/src/json-patch' ),
         'moment': path.resolve( './bower_components/moment/moment' ),
         'react': path.resolve( './bower_components/react/react' ),
         'react-dom': path.resolve( './bower_components/react/react-dom' ),
         'laxar': path.resolve( './includes/lib/laxar/laxar' ),
         'whatwg-fetch': path.resolve( './bower_components/whatwg-fetch/fetch' ),
         'laxar-react-adapter': path.resolve( './includes/lib/laxar-react-adapter/laxar-react-adapter' ),
         'laxar-angular-adapter': path.resolve( './includes/lib/laxar-angular-adapter/laxar-angular-adapter' ),
         // uncomment to test the dist version of laxar or the git submodule
         // 'laxar': path.resolve( './includes/lib/laxar/dist/laxar' ),
         'laxar-application': path.resolve( __dirname ),
         'laxar-application-dependencies': './var/flows/main/dependencies',

         'laxar-path-root': '.',
         'laxar-path-layouts': './application/layouts',
         'laxar-path-pages': './application/pages',
         'laxar-path-widgets': './includes/widgets',
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
         },
         // {
         //    test: /\.json$/,
         //    exclude: /(node_modules|bower_components|spec)/,
         //    loader: 'json-loader'
         // }
      ]
   }
};
