import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AdquisicionesService } from './adquisiciones.service';
import { Adquisicion } from '../models/adquisicion.model';

describe('AdquisicionesService', () => {
  let service: AdquisicionesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AdquisicionesService]
    });
    
    service = TestBed.inject(AdquisicionesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve all adquisiciones', () => {
    const mockAdquisiciones: Adquisicion[] = [
      //{ id: 1, nombre: 'Test 1', descripcion: 'Desc 1', fecha: new Date(), costo: 100, estado: 'Pendiente' },
      //{ id: 2, nombre: 'Test 2', descripcion: 'Desc 2', fecha: new Date(), costo: 200, estado: 'Completada' }
    ];

    service.obtenerAdquisiciones().subscribe(adquisiciones => {
      expect(adquisiciones.length).toBe(2);
      expect(adquisiciones).toEqual(mockAdquisiciones);
    });

    const req = httpMock.expectOne('api/adquisiciones');
    expect(req.request.method).toBe('GET');
    req.flush(mockAdquisiciones);
  });

  // Más pruebas para los otros métodos del servicio
});
