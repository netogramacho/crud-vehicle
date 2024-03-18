import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'create',
    loadChildren: () =>
      import('./pages/form-vehicle/form-vehicle.module').then(
        (m) => m.FormVehicleModule
      ),
  },
  {
    path: 'edit/:id',
    loadChildren: () =>
      import('./pages/form-vehicle/form-vehicle.module').then(
        (m) => m.FormVehicleModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
