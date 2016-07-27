/* eslint-env node */
/* eslint-disable max-len */
module.exports = {
   aliases: {
      flows: {
         main: 0
      },
      pages: {
         shop_demo: 0
      },
      layouts: {
         application: 0
      },
      themes: {
         'cube': 0,
         'default': 1
      },
      widgets: {
         'shop-demo/dummy-articles-activity': 0,
         'shop-demo/article-browser-widget': 1
      }
   },
   flows: [ {
      definition: require( '!!json!./application/flows/main.json' )
   } ],
   pages: [ {
      descriptor: {
         name: 'shop_demo'
      },
      definition: require( '!!json!./application/pages/shop_demo.json' )
   } ],
   layouts: [ {
      descriptor: {
         name: 'application'
      },
      assets: {
         'default.theme': {
            'application.html': {
               content: require( '!!raw!./application/layouts/application/default.theme/application.html' )
            },
            'css/application.css': {
               url: './application/layouts/application/default.theme/css/application.css'
            }
         }
      }
   } ],
   themes: [ {
      descriptor: {
         name: 'cube.theme'
      },
      assets: {
         'cube.theme': {
            'css/theme.css': {
               url: './includes/themes/cube.theme/css/theme.css'
            }
         }
      }
   }, {
      descriptor: {
         name: 'default.theme'
      },
      assets: {
         'default.theme': {
            'css/theme.css': {
               url: './includes/lib/laxar-uikit/themes/default.theme/css/theme.css'
            }
         }
      }
   } ],
   widgets: [ {
      descriptor: require( '!!json!./includes/widgets/shop-demo/dummy-articles-activity/widget.json' ),
      module: require( './includes/widgets/shop-demo/dummy-articles-activity/dummy-articles-activity' )
   }, {
      descriptor: require( '!!json!./includes/widgets/shop-demo/article-browser-widget/widget.json' ),
      module: require( './includes/widgets/shop-demo/article-browser-widget/article-browser-widget' ),
      assets: {
         'default.theme': {
            'article-browser-widget.html': {
               content: require( '!!raw!./includes/widgets/shop-demo/article-browser-widget/default.theme/article-browser-widget.html' )
            },
            'css/article-browser-widget.css': {
               url: './includes/widgets/shop-demo/article-browser-widget/default.theme/css/article-browser-widget.css'
            }
         },
         'cube.theme': {
            'css/article-browser-widget.css': {
               url: './includes/widgets/shop-demo/article-browser-widget/cube.theme/css/article-browser-widget.css'
            }
            // 'article-browser-widget.html': {
            //    content: require( '!!raw!./includes/themes/cube.theme/article-browser-widget/article-browser-widget.html' )
            // }
         }
      }
   } ],
   controls: [
   ]
};
