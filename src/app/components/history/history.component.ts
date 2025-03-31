import { Component, OnInit, inject } from '@angular/core';
import { HistoryService } from '../../services/history.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { Observable, catchError, finalize, of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
  standalone: true,
  imports: [CommonModule, DatePipe, HttpClientModule] // Eliminado JsonPipe
})
export class HistoryComponent implements OnInit {
  historyItems: any[] = [];
  loading: boolean = false;
  adquisicionId!: number;
  errorMessage: string | null = null;

  private route = inject(ActivatedRoute);
  private historyService = inject(HistoryService);

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      //this.adquisicionId = +params['id']; 

      if (this.adquisicionId) {
        this.loadHistory();
      } else {
        this.errorMessage = 'ID de adquisición no válido';
      }
    });
  }

  loadHistory(): void {
    this.loading = true;
    this.errorMessage = null;

    this.historyService.getHistory(this.adquisicionId)
      .pipe(
        catchError(error => {
          console.error('Error al cargar historial:', error);
          this.errorMessage = 'Error al cargar el historial';
          return of([]);
        }),
        finalize(() => this.loading = false)
      )
      .subscribe({
        next: (data) => {
          this.historyItems = data;
          console.log('Datos recibidos:', data);
        },
        error: (err) => {
          console.error('Error en la suscripción:', err);
        }
      });
  }

  //Devuelve el texto correcto para la acción (evita lógica en la plantilla)
  getAccionTexto(accion: string): string {
    switch (accion) {
      case 'CREATE': return 'Creación';
      case 'UPDATE': return 'Actualización';
      case 'DELETE': return 'Eliminación';
      default: return 'Cambio registrado';
    }
  }

  //Extrae las claves de un objeto de forma segura
  getObjectKeys(obj: any): string[] {
    return obj ? Object.keys(obj) : [];
  }

  //Verifica si una cadena es un JSON válido
  isValidJson(jsonString: string): boolean {
    try {
      JSON.parse(jsonString);
      return true;
    } catch {
      return false;
    }
  }

  //Parsea un JSON de forma segura
  parseJson(jsonString: string): any {
    try {
      return JSON.parse(jsonString);
    } catch {
      return null;
    }
  }

  //Método para el trackBy en *ngFor
  trackById(index: number, item: any) {
    return item.id;
  }
}
