import { Injectable } from '@angular/core';
import { Solicitud, Estudiante } from '../models/solicitud.model';
import { crearSolicitud, resumen } from '../utils/helpers';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {
private solicitudes: Solicitud[] = [];

  constructor() {
    const estudiante1: Estudiante = { id: 1, nombre: 'Joseph', codigo: 'ISIL2026', correo: 'joseph@isil.pe' };
    const estudiante2: Estudiante = { id: 2, nombre: 'Adrian', codigo: 'ISIL1010', correo: 'adrian@isil.pe' };

    this.solicitudes.push(
      crearSolicitud({ estudiante: estudiante1, tipo: 'constancia', descripcion: 'Para trabajo' }, 1, 'aprobada'),
      crearSolicitud({ estudiante: estudiante2, tipo: 'retiro_curso', descripcion: 'Cruce de horarios' }, 2, 'pendiente')
    );
  }

  obtenerSolicitudes(): Solicitud[] {
    return this.solicitudes;
  }
  obtenerResumenes(): string[] {
    return this.solicitudes.map(s => resumen(s));
  }
}
