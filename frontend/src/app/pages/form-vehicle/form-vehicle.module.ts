import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormVehicleComponent } from './form-vehicle.component';
import { FormVehicleRoutingModule } from './form-vehicle-routing.module';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [FormVehicleComponent],
  imports: [
    FormVehicleRoutingModule,
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
})
export class FormVehicleModule {}
