/**
 * Copyright 2015 aixigo AG
 * Released under the MIT license
 */
import 'polyfills';
import 'number-to-locale-string';
import { bootstrap } from 'laxar';

import * as angularAdapter from 'laxar-angular-adapter';
import * as reactAdapter from 'laxar-react-adapter';

import artifacts from 'laxar-loader?flows=main&themes[]=default&themes[]=cube!./package.json';

bootstrap( document.querySelector( '[data-ax-page]' ), {
   widgetAdapters: [ angularAdapter, reactAdapter ],
   configuration: window.laxarConfig,
   artifacts
} );
