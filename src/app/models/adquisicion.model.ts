export interface Adquisicion {
  id: number;
  presupuesto: string;
  unidad: string;
  tipoBienServicio: string;
  cantidad: number;
  valorUnitario: number;
  valorTotal: number;
  fechaAdquisicion: Date | string;
  proveedor: string;
  documentacion: string;
}
