import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Adquisicion } from '../models/adquisicion.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdquisicionesService {
  private apiUrl = `${environment.apiBaseUrl}/api/adquisiciones`;

  constructor(private http: HttpClient) { }

  obtenerAdquisiciones(): Observable<Adquisicion[]> {
    return this.http.get<Adquisicion[]>(this.apiUrl);
  }

  obtenerAdquisicionPorId(id: number): Observable<Adquisicion> {
    return this.http.get<Adquisicion>(`${this.apiUrl}/${id}`);
  }

  agregarAdquisicion(adquisicion: Adquisicion): Observable<Adquisicion> {
    return this.http.post<Adquisicion>(this.apiUrl, adquisicion);
  }

  actualizarAdquisicion(adquisicion: Adquisicion): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${adquisicion.id}`, adquisicion);
  }

  eliminarAdquisicion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
