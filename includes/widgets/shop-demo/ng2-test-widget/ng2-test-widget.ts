import { Component, NgModule } from '@angular/core';
import { AxEventBus, AxContext } from 'laxar-types';
import { AxAngularModule } from 'laxar-angular2-adapter';

@Component( {
   templateUrl: 'ax-widget:template:ng2-test-widget'
} )
export class Ng2TestWidget {

   name = 'World';
   areaName: any;

   constructor( eventBus: AxEventBus, context: AxContext ) {
      this.areaName = context.features.areaName;
   }

   nameChanged( newName: string ): void {
      this.name = newName;
   }

}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

@NgModule( {
   imports: [ AxAngularModule ],
   declarations: [ Ng2TestWidget ]
} )
export class Ng2TestWidgetModule {}
