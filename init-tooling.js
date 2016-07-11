/**
 * Copyright 2015 aixigo AG
 * Released under the MIT license
 */
import { bootstrap } from 'laxar';
import applicationDependencies from 'laxar-loader?dependencies!./application/flow/flow.json';
import resources from 'laxar-loader?resources!./application/flow/flow.json';
import * as angularAdapter from 'laxar-angular-adapter';
import * as reactAdapter from 'laxar-react-adapter';
import 'whatwg-fetch';

window.laxar.fileListings = {
  application: resources,
  bower_components: resources,
  includes: resources
};

bootstrap( document.querySelector( '[data-ax-page]' ), {
   widgetAdapters: [ angularAdapter, reactAdapter ],
   widgetModules: applicationDependencies,
   configuration: window.laxar
} );
