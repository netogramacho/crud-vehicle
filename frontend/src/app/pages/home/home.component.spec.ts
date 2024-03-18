import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { VehicleFacade } from 'src/app/shared/facade/vehicle/vehicle.facade';
import { of } from 'rxjs';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let vehicleFacade: VehicleFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [VehicleFacade],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    vehicleFacade = TestBed.inject(VehicleFacade);
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call loadVehicles on ngOnInit', () => {
    spyOn(vehicleFacade, 'loadVehicles').and.returnValue(of(null));

    component.ngOnInit();

    expect(vehicleFacade.loadVehicles).toHaveBeenCalled();
  });

  it('should set vehicles$ on ngOnInit', () => {
    const vehicles = [
      { id: 1, name: 'Vehicle 1' },
      { id: 2, name: 'Vehicle 2' },
    ];
    spyOn(vehicleFacade, 'getVehicles$').and.returnValue(of(vehicles));

    component.ngOnInit();

    expect(component.vehicles$).toEqual(vehicles);
  });

  it('should call createVehicle on createVehicle', () => {
    spyOn(vehicleFacade, 'createVehicle').and.returnValue(of(null));

    component.createVehicle();

    expect(vehicleFacade.createVehicle).toHaveBeenCalled();
  });

  it('should call deleteVehicle on deleteVehicle', () => {
    spyOn(vehicleFacade, 'deleteVehicle').and.returnValue(of(null));

    component.deleteVehicle(1);

    expect(vehicleFacade.deleteVehicle).toHaveBeenCalledWith(1);
  });

  it('should call destroy$ on ngOnDestroy', () => {
    const nextSpy = spyOn((component as any).destroy$, 'next');
    const completeSpy = spyOn((component as any).destroy$, 'complete');

    component.ngOnDestroy();

    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
