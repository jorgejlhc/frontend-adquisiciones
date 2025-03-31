import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl } from '@angular/forms';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Adquisicion } from '../../../models/adquisicion.model';
import { AdquisicionesService } from '../../../services/adquisiciones.service';
import { CommonModule } from '@angular/common';
import { Observable, Subscription } from 'rxjs';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgbModule],
  selector: 'app-adquisicion-form',
  templateUrl: './adquisicion-form.component.html',
  styleUrls: ['./adquisicion-form.component.scss']
})
export class AdquisicionFormComponent implements OnInit {
  @Input() adquisicion?: Adquisicion;
  form: FormGroup;

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private service: AdquisicionesService
  ) {
    this.form = this.fb.group({
      id: [null],
      presupuesto: ['', Validators.required],
      unidad: ['', Validators.required],
      tipoBienServicio: ['', Validators.required],
      cantidad: [0, [Validators.required, Validators.min(1)]],
      valorUnitario: [0, [Validators.required, Validators.min(0)]],
      valorTotal: [0, [Validators.required, Validators.min(0)]],
      fechaAdquisicion: ['', Validators.required],
      proveedor: ['', Validators.required],
      documentacion: ['']
    });
  }

  ngOnInit(): void {
    if (this.adquisicion) {
      this.form.patchValue({
        ...this.adquisicion,
        fechaAdquisicion: this.formatDate(this.adquisicion.fechaAdquisicion)
      });
    }
    
    this.calcularValorTotal();
    
    this.form.get('cantidad')?.valueChanges.subscribe(() => this.calcularValorTotal());
    this.form.get('valorUnitario')?.valueChanges.subscribe(() => this.calcularValorTotal());
  }

  private formatDate(date: any): string {
    const d = new Date(date);
    return d.toISOString().split('T')[0];
  }

  calcularValorTotal(): void {
    const cantidad = this.form.get('cantidad')?.value || 0;
    const valorUnitario = this.form.get('valorUnitario')?.value || 0;
    this.form.patchValue({
      valorTotal: cantidad * valorUnitario
    }, {emitEvent: false});
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    
    const formData = this.form.value;
    const operation: Observable<Adquisicion | void> = formData.id 
      ? this.service.actualizarAdquisicion(formData)
      : this.service.agregarAdquisicion(formData);
  
    const subscription: Subscription = operation.subscribe({
      next: () => this.activeModal.close('guardado'),
      error: (error: any) => console.error('Error:', error)
    });
  }
}
