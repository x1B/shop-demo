import { Component, NgModule, OnDestroy } from '@angular/core';
import { AxEventBus } from 'laxar-types';

@Component( {
   selector: 'ng2-test-widget',
   template: `
      <h1>Hello {{name}}</h1>
      <input (input)="nameChanged($event.target.value)" value="{{name}}">
   `
} )
export class Ng2TestWidget implements OnDestroy {

   name = 'World';

   constructor( eventBus: AxEventBus ) {
      eventBus.subscribe( 'didNavigate', (event, meta) => {
         this.name = meta.cycleId;
         console.log( 'didNavigate' );
      } );
      eventBus.subscribe( 'beginLifecycleRequest', (event, meta) => {
         this.name = meta.cycleId;
         console.log( 'beginLifecycleRequest' );
      } );
      eventBus.subscribe( 'didReplace', (event, meta) => {
         this.name = meta.cycleId;
         console.log( 'didReplace', meta.cycleId );
      } );
   }

   nameChanged( newName: string ): void {
      console.log( newName );
      this.name = newName;
   }

   ngOnInit(): void {
      console.log( 'hello there' );
   }

   ngOnDestroy(): void {
      console.log( 'goodbye widget!' );
   }

}


@NgModule( {
   imports: [  ],
   exports: [ Ng2TestWidget ],
   declarations: [ Ng2TestWidget ]
} )
export class Ng2TestWidgetModule { }
