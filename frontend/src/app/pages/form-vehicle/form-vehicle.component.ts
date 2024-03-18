import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { VehicleFacade } from 'src/app/shared/facade/vehicle/vehicle.facade';

@Component({
  selector: 'form-vehicle',
  templateUrl: './form-vehicle.component.html',
  styleUrls: ['./form-vehicle.component.scss'],
})
export class FormVehicleComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  isUpdate = false;
  constructor(
    private routerService: Router,
    private vehicleFacade: VehicleFacade,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}

  vehicle: FormGroup = this.formBuilder.group({
    id: [''],
    placa: ['', Validators.required],
    chassi: ['', Validators.required],
    renavam: ['', Validators.required],
    modelo: ['', Validators.required],
    marca: ['', Validators.required],
    ano: [0, Validators.required],
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getEditVehicle(id);
      this.isUpdate = true;
    }
  }

  getEditVehicle(id: string) {
    this.vehicleFacade
      .getVehicle(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: any) => {
        this.vehicle.setValue({
          id: response.id,
          placa: response.placa,
          chassi: response.chassi,
          renavam: response.renavam,
          modelo: response.modelo,
          marca: response.marca,
          ano: response.ano,
        });
      });
  }

  validateAndSend() {
    this.vehicle.markAllAsTouched();
    if (!this.vehicle.invalid) {
      if (this.isUpdate) {
        this.updateVehicle();
      } else {
        this.createVehicle();
      }

    }
  }

  createVehicle() {
    this.vehicleFacade
      .createVehicle(this.vehicle.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.routerService.navigate(['/']);
      });
  }

  updateVehicle() {
    this.vehicleFacade
      .updateVehicle(this.vehicle.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.routerService.navigate(['/']);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
