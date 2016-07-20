/**
 * Copyright 2015 aixigo AG
 * Released under the MIT license
 */
import { bootstrap } from 'laxar';
import applicationDependencies from './var/flows/main/dependencies';
import resources from 'json!./var/flows/main/resources.json';
import * as angularAdapter from 'laxar-angular-adapter';
import * as reactAdapter from 'laxar-react-adapter';
import 'whatwg-fetch';

bootstrap( document.querySelector( '[data-ax-page]' ), {
   widgetAdapters: [ angularAdapter, reactAdapter ],
   widgetModules: applicationDependencies,
   configuration: window.laxarConfig,
   resources
} );
