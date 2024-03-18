import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Vehicle } from "../../interfaces/vehicle";

@Injectable({
  providedIn: 'root'
})
export class VehicleStateService {

  private updating$ = new BehaviorSubject<boolean>(false);
  private vehicles$ = new BehaviorSubject<Vehicle[]>([]);

  isUpdating$() {
    return this.updating$.asObservable();
  }

  getVehicles$() {
    return this.vehicles$.asObservable();
  }

  setUpdating(isUpdating: boolean) {
    this.updating$.next(isUpdating);
  }

  setVehicles(vehicles: Vehicle[]) {
    this.vehicles$.next(vehicles);
  }

  addVehicle(vehicle: Vehicle): void {
    const currentVehicles = this.vehicles$.getValue();
    this.vehicles$.next([...currentVehicles, vehicle]);
  }

  updateVehicle(updatedVehicle: Vehicle): void {
    const currentVehicles = this.vehicles$.getValue();
    const updatedVehicles = currentVehicles.map(vehicle => {
      if (vehicle.id === updatedVehicle.id) {
        return updatedVehicle;
      } else {
        return vehicle;
      }
    });
    this.vehicles$.next(updatedVehicles);
  }

  deleteVehicle(vehicleId: number): void {
    const currentVehicles = this.vehicles$.getValue();
    const updatedVehicles = currentVehicles.filter(vehicle => vehicle.id !== vehicleId);
    this.vehicles$.next(updatedVehicles);
  }
}
