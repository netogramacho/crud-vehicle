import { Injectable, OnDestroy } from '@angular/core';
import { VehicleApi } from '../../api/vehicle-api';
import { Subject, catchError, map, of, takeUntil } from 'rxjs';
import { Vehicle } from '../../interfaces/vehicle';
import { ApiResponse } from '../../interfaces/api-response';
import { VehicleStateService } from '../../state/vehicle/vehicle.state.service';

@Injectable({
  providedIn: 'root',
})
export class VehicleFacade implements OnDestroy {
  private destroy$ = new Subject<void>();

  constructor(
    private vehicleApi: VehicleApi,
    private vehicleStateService: VehicleStateService
  ) {}

  getIsUpdating$() {
    return this.vehicleStateService.isUpdating$();
  }

  getVehicles$() {
    return this.vehicleStateService.getVehicles$();
  }

  loadVehicles() {
    this.vehicleStateService.setUpdating(true);
    return this.vehicleApi
      .getVehicle()
      .pipe(
        map((response: ApiResponse<Vehicle>) => {
          this.vehicleStateService.setVehicles(response.result);
          this.vehicleStateService.setUpdating(false);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  getVehicle(id: string) {
    this.vehicleStateService.setUpdating(true);
    return this.vehicleApi.getVehicleById(id).pipe(
      map((response) => {
        this.vehicleStateService.setUpdating(false);
        return response;
      })
    );
  }

  createVehicle(vehicle: Vehicle) {
    this.vehicleStateService.setUpdating(true);
    return this.vehicleApi.createVehicle(vehicle).pipe(
      map((response) => {
        this.vehicleStateService.addVehicle(response);
        this.vehicleStateService.setUpdating(false);
      }),
      catchError((error) => {
        console.log('error', error);
        this.vehicleStateService.setUpdating(false);
        return of({});
      })
    );
  }

  updateVehicle(vehicle: Vehicle) {
    this.vehicleStateService.setUpdating(true);
    return this.vehicleApi.updateVehicle(vehicle).pipe(
      map((response: ApiResponse<Vehicle>) => {
        this.vehicleStateService.updateVehicle(vehicle);
        this.vehicleStateService.setUpdating(false);
      })
    );
  }

  deleteVehicle(vehicleId: number) {
    this.vehicleStateService.setUpdating(true);
    return this.vehicleApi.deleteVehicle(vehicleId).pipe(
      map((response: ApiResponse<any>) => {
        this.vehicleStateService.deleteVehicle(vehicleId);
        this.vehicleStateService.setUpdating(false);
      })
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
