import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { Adquisicion } from '../../../models/adquisicion.model';
import { AdquisicionesService } from '../../../services/adquisiciones.service';
import { NotificationService } from '../../../shared/notification.service';
import { AdquisicionListComponent } from './adquisicion-list.component';

describe('AdquisicionListComponent', () => {
  let component: AdquisicionListComponent;
  let fixture: ComponentFixture<AdquisicionListComponent>;
  let mockAdquisicionesService: jasmine.SpyObj<AdquisicionesService>;
  let mockModalService: jasmine.SpyObj<NgbModal>;
  let mockNotificationService: jasmine.SpyObj<NotificationService>;

  const mockAdquisiciones: Adquisicion[] = [
    // id: 1, nombre: 'Test 1', descripcion: 'Desc 1', fecha: new Date(), costo: 100, estado: 'Pendiente' }
  ];

  beforeEach(async () => {
    mockAdquisicionesService = jasmine.createSpyObj('AdquisicionesService', [
      'obtenerAdquisiciones', 
      'eliminarAdquisicion'
    ]);
    
    mockModalService = jasmine.createSpyObj('NgbModal', ['open']);
    mockNotificationService = jasmine.createSpyObj('NotificationService', [
      'confirmDelete',
      'showSuccess',
      'showError'
    ]);

    await TestBed.configureTestingModule({
      declarations: [AdquisicionListComponent],
      providers: [
        { provide: AdquisicionesService, useValue: mockAdquisicionesService },
        { provide: NgbModal, useValue: mockModalService },
        { provide: NotificationService, useValue: mockNotificationService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AdquisicionListComponent);
    component = fixture.componentInstance;
    
    mockAdquisicionesService.obtenerAdquisiciones.and.returnValue(of(mockAdquisiciones));
    mockNotificationService.confirmDelete.and.returnValue(Promise.resolve(true));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load adquisiciones on init', () => {
    expect(mockAdquisicionesService.obtenerAdquisiciones).toHaveBeenCalled();
    expect(component.adquisiciones).toEqual(mockAdquisiciones);
  });

  it('should call delete service when confirmed', () => {
    mockAdquisicionesService.eliminarAdquisicion.and.returnValue(of(void 0));
    
    component.eliminarAdquisicion(1);
    
    expect(mockNotificationService.confirmDelete).toHaveBeenCalled();
    expect(mockAdquisicionesService.eliminarAdquisicion).toHaveBeenCalledWith(1);
  });

  // Más pruebas para otros métodos
});
