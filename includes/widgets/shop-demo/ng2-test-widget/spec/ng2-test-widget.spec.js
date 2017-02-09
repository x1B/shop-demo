/**
 * Copyright 2017 aixigo AG
 * Released under the MIT license.
 * http://laxarjs.org/license
 */
import 'laxar-angular2-adapter/test-support';
import * as axMocks from 'laxar-mocks';
import descriptor from '../widget.json';

describe( 'An ng2-test-widget', () => {

   let widgetDom;

   beforeEach( axMocks.createSetupForWidget( descriptor ) );

   beforeEach( () => {
      axMocks.widget.configure( {
         areaName: 'testArea'
      } );
   } );
   beforeEach( axMocks.widget.load );
   beforeEach( () => {
      widgetDom = axMocks.widget.render();
   } );

   afterEach( axMocks.tearDown );

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   it( 'registers the configured widget area', () => {
      expect( axMocks.widget.axAreaHelper.register )
         .toHaveBeenCalledWith( 'testArea', jasmine.any( HTMLElement ) );
   } );

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   it( 'renders its template', () => {
      const areaNode = widgetDom.querySelector( '[ng-reflect-ax-widget-area]' );
      expect( areaNode.getAttribute( 'ng-reflect-ax-widget-area' ) ).toEqual( 'testArea' );
      expect( widgetDom.querySelectorAll( 'input' ).length ).toBe( 1 );
   } );

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   // TODO: How to test angular2 specific stuff? We probably need some way to use the Angular 2 testbed and
   // expose the fixture created by it


} );
