export type EstadoSolicitud = 'pendiente' | 'en_proceso' | 'aprobada' | 'rechazada';

export type TipoSolicitud = 'constancia' | 'retiro_curso' | 'reincorporacion' | 'convalidacion';

export interface Estudiante {
  id: number;
  nombre: string;
  codigo: string;
  correo: string;
}

export interface Solicitud {
  id: number;
  estudiante: Estudiante;
  tipo: TipoSolicitud;
  descripcion: string;
  estado: EstadoSolicitud;
  fecha: Date;
}