/**
 * Copyright 2017 aixigo AG
 * Released under the MIT license.
 * http://laxarjs.org/license
 */
import { Directive, ElementRef, NgModule } from '@angular/core';

@Directive( {
   selector: '[veryImportant]'
} )
class VeryImportant {
   constructor( el: ElementRef ) {
      el.nativeElement.style.backgroundColor = 'yellow';
      el.nativeElement.style.color = 'red';
      el.nativeElement.style.fontWeight = 'bold';
   }
}

@NgModule( {
   declarations: [ VeryImportant ],
   exports: [ VeryImportant ]
} )
export class Ng2TestControlModule {

}
