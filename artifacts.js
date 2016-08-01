/* eslint-env node */
/* eslint-disable max-len */
module.exports = {
   aliases: {
      flows: {
         main: 0
      },
      pages: {
         shop_demo: 0,
         finish_order: 1
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
         'shop-demo/article-browser-widget': 1,
         'shop-demo/article-teaser-widget': 2,
         'shop-demo/shopping-cart-widget': 3,
         'shop-demo/article-search-box-widget': 4,
         'shop-demo/headline-widget': 5,
         'ax-accordion-widget': 6
      },
      controls: {
         'laxar-accordion-control': 0
      }
   },
   flows: [ {
      descriptor: { name: 'main' },
      definition: require( '!!json!./application/flows/main.json' )
   } ],
   pages: [ {
      descriptor: {
         name: 'shop_demo'
      },
      definition: require( '!!json!./application/pages/shop_demo.json' )
   }, {
      descriptor: {
         name: 'finish_order'
      },
      definition: require( '!!json!./application/pages/finish_order.json' )
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
         }
      }
   }, {
      descriptor: require( '!!json!./includes/widgets/shop-demo/article-teaser-widget/widget.json' ),
      module: require( './includes/widgets/shop-demo/article-teaser-widget/article-teaser-widget' ),
      assets: {
         'default.theme': {
            'css/article-teaser-widget.css': {
               url: './includes/widgets/shop-demo/article-teaser-widget/default.theme/css/article-teaser-widget.css'
            }
         },
         'cube.theme': {
            'css/article-teaser-widget.css': {
               url: './includes/widgets/shop-demo/article-teaser-widget/cube.theme/css/article-teaser-widget.css'
            }
         }
      }
   }, {
      descriptor: require( '!!json!./includes/widgets/shop-demo/shopping-cart-widget/widget.json' ),
      module: require( './includes/widgets/shop-demo/shopping-cart-widget/shopping-cart-widget' ),
      assets: {
         'default.theme': {
            'shopping-cart-widget.html': {
               content: require( '!!raw!./includes/widgets/shop-demo/shopping-cart-widget/default.theme/shopping-cart-widget.html' )
            },
            'css/shopping-cart-widget.css': {
               url: './includes/widgets/shop-demo/shopping-cart-widget/default.theme/css/shopping-cart-widget.css'
            }
         },
         'cube.theme': {
            'css/shopping-cart-widget.css': {
               url: './includes/widgets/shop-demo/shopping-cart-widget/cube.theme/css/shopping-cart-widget.css'
            }
         }
      }
   }, {
      descriptor: require( '!!json!./includes/widgets/shop-demo/article-search-box-widget/widget.json' ),
      module: require( './includes/widgets/shop-demo/article-search-box-widget/article-search-box-widget' ),
      assets: {
         'default.theme': {
            'article-search-box-widget.html': {
               content: require( '!!raw!./includes/widgets/shop-demo/article-search-box-widget/default.theme/article-search-box-widget.html' )
            },
            'css/article-search-box-widget.css': {
               url: './includes/widgets/shop-demo/article-search-box-widget/default.theme/css/article-search-box-widget.css'
            }
         }
      }
   }, {
      descriptor: require( '!!json!./includes/widgets/shop-demo/headline-widget/widget.json' ),
      module: require( './includes/widgets/shop-demo/headline-widget/headline-widget' ),
      assets: {
         'default.theme': {
            'headline-widget.html': {
               content: require( '!!raw!./includes/widgets/shop-demo/headline-widget/default.theme/headline-widget.html' )
            }
         }
      }
   }, {
      descriptor: require( '!!json!./includes/widgets/ax-accordion-widget/widget.json' ),
      module: require( './includes/widgets/ax-accordion-widget/ax-accordion-widget' ),
      assets: {
         'default.theme': {
            'ax-accordion-widget.html': {
               content: require( '!!raw!./includes/widgets/ax-accordion-widget/default.theme/ax-accordion-widget.html' )
            },
            'css/article-search-box-widget.css': {
               url: './includes/widgets/ax-accordion-widget/default.theme/css/ax-accordion-widget.css'
            }
         }
      }
   } ],
   controls: [
      {
         descriptor: require( '!!json!./includes/controls/laxar-accordion-control/control.json' ),
         module: require( './includes/controls/laxar-accordion-control/ax-accordion-control' ),
         assets: {
            'default.theme': {
               'css/ax-accordion-control.css': {
                  url: './includes/widgets/ax-accordion-control/default.theme/css/ax-accordion-control.css'
               }
            }
         }
      }
   ]
};
