/**
 * Copyright 2015 aixigo AG
 * Released under the MIT license
 */
import 'polyfills';
import 'number-to-locale-string';
import { bootstrap } from 'laxar';

import * as angularAdapter from 'laxar-angular-adapter';
import * as reactAdapter from 'laxar-react-adapter';

import artifacts from 'laxar-loader/artifacts?flow=main&theme=cube';

const config = {
   name: 'LaxarJS ShopDemo',
   // routerImplementation: {
   //    navigateTo: ...,
   //    ...
   // },
   router: {
      query: {
         enabled: true
      },
      pagejs: {
         hashbang: true
      }
   },
   flow: {
      name: 'main'
   },
   logging: {
      threshold: 'TRACE'
   },
   theme: 'cube',
   tooling: {
      enabled: true
   }
};

bootstrap( document.querySelector( '[data-ax-page]' ), {
   widgetAdapters: [ angularAdapter, reactAdapter ],
   configuration: config,
   artifacts
} );
