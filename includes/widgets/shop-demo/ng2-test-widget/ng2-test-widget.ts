import { Component, NgModule, OnDestroy } from '@angular/core';
import { AxEventBus, AxContext } from 'laxar-types';
import { AxAngularModule } from 'laxar-angular2-adapter';

@Component( {
   template: `
      <h1>Hello {{name}}</h1>
      <div [axWidgetArea]="areaName"></div>
      <input (input)="nameChanged($event.target.value)" value="{{name}}">
   `
} )
export class Ng2TestWidget implements OnDestroy {

   name = 'World';
   areaName: any;

   constructor( eventBus: AxEventBus, context: AxContext ) {
      this.areaName = context.features.areaName;

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
   imports: [ AxAngularModule ],
   declarations: [ Ng2TestWidget ]
} )
export class Ng2TestWidgetModule { }
