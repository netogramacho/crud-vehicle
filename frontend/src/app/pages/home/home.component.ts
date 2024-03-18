import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
import { VehicleFacade } from 'src/app/shared/facade/vehicle/vehicle.facade';
import { Vehicle } from 'src/app/shared/interfaces/vehicle';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['placa', 'chassi', 'renavam', 'modelo', 'marca', 'ano', 'editar', 'excluir'];

  private destroy$ = new Subject<void>();
  vehicles$: Observable<Vehicle[]> | null = null;
  constructor(private vechicleFacade: VehicleFacade, private routerService: Router) {}

  ngOnInit(): void {
    this.vechicleFacade.loadVehicles();
    this.vehicles$ = this.vechicleFacade.getVehicles$();
  }

  addNewVehicle() {
    this.routerService.navigate([`/create`])
  }

  updateVehicle(vehicle: Vehicle) {
    this.routerService.navigate([`/edit/${vehicle.id}`])
  }

  deleteVehicle(vehicleId: number) {
    this.vechicleFacade.deleteVehicle(vehicleId)
    .pipe(takeUntil(this.destroy$))
    .subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
