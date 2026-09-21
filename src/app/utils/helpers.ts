import { Solicitud, EstadoSolicitud } from '../models/solicitud.model';

export const filtrarPorEstado = (lista: Solicitud[], estado: EstadoSolicitud): Solicitud[] =>
  lista.filter(s => s.estado === estado);

export const buscarPorId = (lista: Solicitud[], id: number): Solicitud | undefined =>
  lista.find(s => s.id === id);

export const resumen = ({ id, tipo, estado, estudiante }: Solicitud): string =>
  `#${id} | ${tipo} | ${estado} | ${estudiante.nombre}`;

export const contarPorEstado = (lista: Solicitud[]): Record<EstadoSolicitud, number> =>
  lista.reduce(
    (acc, { estado }) => ({ ...acc, [estado]: acc[estado] + 1 }),
    { pendiente: 0, en_proceso: 0, aprobada: 0, rechazada: 0 } as Record<EstadoSolicitud, number>
  );

export const cambiarEstado = (solicitud: Solicitud, nuevoEstado: EstadoSolicitud): Solicitud =>
  ({ ...solicitud, estado: nuevoEstado });

export const crearSolicitud = (
  datos: Omit<Solicitud, 'id' | 'estado' | 'fecha'>,
  id: number,
  estado: EstadoSolicitud = 'pendiente'
): Solicitud => ({ ...datos, id, estado, fecha: new Date() });