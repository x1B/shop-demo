import { Component, NgModule } from '@angular/core';
import { AxAngularModule, AxContext, AxControls, AxEventBus, AxFeaturesHelper, AxId } from 'laxar-angular2-adapter';
import { Ng2TestControlModule } from 'ng2-test-control';

@Component( {
   templateUrl: 'ax-widget:template:ng2-test-widget'
} )
export class Ng2TestWidget {

   name = 'World';
   areaName: any;

   constructor( featuresHelper: AxFeaturesHelper ) {
      this.areaName = featuresHelper.get( 'areaName' );
   }

   nameChanged( newName: string ): void {
      this.name = newName;
   }

}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

@NgModule( {
   imports: [ AxAngularModule, Ng2TestControlModule ],
   declarations: [ Ng2TestWidget ]
} )
export class Ng2TestWidgetModule {}
