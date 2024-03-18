import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormVehicleComponent } from './form-vehicle.component';

const routes: Routes = [
  {
    path: '',
    component: FormVehicleComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormVehicleRoutingModule {}
