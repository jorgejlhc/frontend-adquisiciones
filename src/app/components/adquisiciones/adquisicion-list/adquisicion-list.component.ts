import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Adquisicion } from '../../../models/adquisicion.model';
import { AdquisicionesService } from '../../../services/adquisiciones.service';
import { NotificationService } from '../../../shared/notification.service';
import { AdquisicionFormComponent } from '../adquisicion-form/adquisicion-form.component';
import { HistoryComponent } from '../../history/history.component';
import { TruncatePipe } from '../../../shared/pipes/truncate.pipe';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule, NgbModule, RouterModule, TruncatePipe],
  selector: 'app-adquisicion-list',
  templateUrl: './adquisicion-list.component.html',
  styleUrls: ['./adquisicion-list.component.scss']
})
export class AdquisicionListComponent implements OnInit {
  adquisiciones: Adquisicion[] = [];
  isLoading = true;

  constructor(
    private adquisicionesService: AdquisicionesService,
    private modalService: NgbModal,
    private notification: NotificationService
  ) { }

  ngOnInit(): void {
    this.cargarAdquisiciones();
  }

  cargarAdquisiciones(): void {
    this.isLoading = true;
    this.adquisicionesService.obtenerAdquisiciones().subscribe({
      next: (data) => {
        this.adquisiciones = data;
        this.isLoading = false;
      },
      error: () => {
        this.notification.showError('Error al cargar las adquisiciones');
        this.isLoading = false;
      }
    });
  }

  abrirFormulario(adquisicion?: Adquisicion): void {
    const modalRef = this.modalService.open(AdquisicionFormComponent, { size: 'lg' });
    modalRef.componentInstance.adquisicion = adquisicion ? {...adquisicion} : undefined;
    
    modalRef.result.then((result) => {
      if (result === 'guardado') {
        this.notification.showSuccess('Operación realizada con éxito');
        this.cargarAdquisiciones();
      }
    }).catch(() => {});
  }

  eliminarAdquisicion(id: number): void {
    this.notification.confirmDelete().then((confirmado) => {
      if (confirmado) {
        this.adquisicionesService.eliminarAdquisicion(id).subscribe({
          next: () => {
            this.notification.showSuccess('Adquisición eliminada con éxito');
            this.cargarAdquisiciones();
          },
          error: () => this.notification.showError('Error al eliminar la adquisición')
        });
      }
    });
  }

  abrirHistorico(id: number): void {
    const modalRefHistory = this.modalService.open(HistoryComponent, { size: 'lg' });
    modalRefHistory.componentInstance.adquisicionId = id ;    
  }

}
