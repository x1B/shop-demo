/**
 * Copyright 2016 aixigo AG
 * Released under the MIT license.
 * http://laxarjs.org/license
 */
// an AMD-example:
/* global define */
define( [ 'angular' ], ng => {
   'use strict';

   Controller.$inject = [];

   function Controller() {

      // The features of this widget are directly bound within the template. Thus the controller needs no code

   }

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   return ng.module( 'headlineWidget', [] ).controller( 'HeadlineWidgetController', Controller );

} );
