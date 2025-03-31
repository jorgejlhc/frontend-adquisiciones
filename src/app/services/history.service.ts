import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  private baseUrl = `${environment.apiBaseUrl}/api/adquisiciones`;

  constructor(private http: HttpClient) { }

  // Obtener historial para una adquisición específica
  getHistory(adquisicionId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/${adquisicionId}/historial`);
  }

  // Registrar cambio (ajustar según tu implementación backend)
  recordChange(adquisicionId: number, action: string, entity: string, details: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/${adquisicionId}/historial`, {
      timestamp: new Date(),
      action,
      entity,
      details,
      user: 'currentUser' // Deberías obtener esto de tu sistema de autenticación
    });
  }
}
