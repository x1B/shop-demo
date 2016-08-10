/**
 * Copyright 2016 aixigo AG
 * Released under the MIT license.
 * http://laxarjs.org/license
 */

// Just as an example, here is an AMD-based widget.
/* global define */
define( [ 'angular' ], ng => {
   'use strict';

   return ng.module( 'headlineWidget', [] )
      .controller( 'HeadlineWidgetController', () => {} );

} );
