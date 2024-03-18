import { Component } from '@angular/core';
import { VehicleFacade } from './shared/facade/vehicle/vehicle.facade';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isUpdating$?: Observable<boolean>;
  constructor(private vehicleFacade: VehicleFacade) {
    this.isUpdating$ = this.vehicleFacade.getIsUpdating$();
  }


}
