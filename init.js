/**
 * Copyright 2015 aixigo AG
 * Released under the MIT license
 */
import { bootstrap } from 'laxar';
import applicationDependencies from './var/flows/main/dependencies';
import resources from 'json!./var/flows/main/resources.json';
// import applicationDependencies from 'laxar-loader?dependencies!laxar-application/application/flow/flow.json';
// import resources from 'laxar-loader?resources&embed!laxar-application/application/flow/flow.json';
import * as angularAdapter from 'laxar-angular-adapter';
import * as reactAdapter from 'laxar-react-adapter';


bootstrap( document.querySelector( '[data-ax-page]' ), {
   widgetAdapters: [ angularAdapter, reactAdapter ],
   widgetModules: applicationDependencies,
   configuration: window.laxarConfig,
   resources
} );

// uncomment to test compatibility mode (change webpack config first)
// import { storage, log, configuration, i18n } from 'laxar';
// log.log( log.level.INFO, 'hey' );
// log.warn( 'ho [1]', 'ho', 'bo' );
// log.info( 'config [0]', configuration.get( 'name' ) );
// storage.getApplicationSessionStorage().setItem( 'wut?', 'SUCCESS' );
// log.info( 'storage [0]', storage.getApplicationSessionStorage().getItem( 'wut?' ) );
// log.info( 'config [0]', i18n.localize( 'en-US', { en: 'Yo', de: 'Ja' } ) );
