/**
 * Copyright 2016 aixigo AG
 * Released under the MIT license.
 * http://laxarjs.org/license
 */

import { articles } from './articles';

export const name = 'dummy-articles-activity';
export const injections = [ 'axEventBus', 'axFeatures' ];
export function create( eventBus, features ) {
   eventBus.subscribe( 'beginLifecycleRequest', () => {
      const articleResource = features.articles.resource;

      eventBus.publish( `didReplace.${articleResource}`, {
         resource: articleResource,
         data: {
            entries: articles
         }
      } );
   } );
}
