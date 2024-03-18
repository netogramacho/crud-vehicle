import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { Vehicle } from '../interfaces/vehicle';

@Injectable()
export class VehicleApi {
  httpOtions = {
    headers: new HttpHeaders().set('Content-Type', 'application/json')
  };

  constructor(private http: HttpClient) {}

  getVehicle(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/vehicle`);
  }

  getVehicleById(id: string) {
    return this.http.get(`${environment.apiUrl}/vehicle/${id}`);
  }

  createVehicle(vehicle: Vehicle): Observable<any> {
    return this.http.post(`${environment.apiUrl}/vehicle`, vehicle, this.httpOtions);
  }

  updateVehicle(vehicle: Vehicle): Observable<any> {
    return this.http.put(`${environment.apiUrl}/vehicle/${vehicle.id}`, vehicle, this.httpOtions);
  }

  deleteVehicle(vehicleId: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/vehicle/${vehicleId}`);
  }
}
