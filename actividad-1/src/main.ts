import { Estudiante, Solicitud } from './models/solicitud.model';
import {
  filtrarPorEstado, buscarPorId, resumen,
  contarPorEstado, cambiarEstado, crearSolicitud
} from './utils/helpers';
import { validarEstudiante } from './utils/validaciones';

const ana: Estudiante = { id: 1, nombre: 'Ana Torres', codigo: 'U2026001', correo: 'ana.torres@correo.com' };
const luis: Estudiante = { id: 2, nombre: 'Luis Rojas', codigo: 'U2026002', correo: 'luis.rojas@correo.com' };

let solicitudes: Solicitud[] = [
  crearSolicitud({ estudiante: ana, tipo: 'constancia', descripcion: 'Constancia de estudios' }, 1),
  crearSolicitud({ estudiante: luis, tipo: 'retiro_curso', descripcion: 'Retiro de Calculo' }, 2, 'en_proceso'),
  crearSolicitud({ estudiante: ana, tipo: 'convalidacion', descripcion: 'Convalidar curso' }, 3),
];

console.log('--- Listado de solicitudes ---');
solicitudes.forEach(s => console.log(resumen(s)));

console.log('\n--- Solo pendientes ---');
filtrarPorEstado(solicitudes, 'pendiente').forEach(s => console.log(resumen(s)));

console.log('\n--- Buscar solicitud #2 ---');
const encontrada = buscarPorId(solicitudes, 2);
console.log(encontrada ? resumen(encontrada) : 'No existe');

console.log('\n--- Aprobar solicitud #1 ---');
solicitudes = solicitudes.map(s => (s.id === 1 ? cambiarEstado(s, 'aprobada') : s));
console.log(resumen(solicitudes[0]));

console.log('\n--- Conteo por estado ---');
console.log(contarPorEstado(solicitudes));

console.log('\n--- Validacion de estudiante ---');
const estudianteInvalido: Estudiante = { ...ana, nombre: '', correo: 'correo-malo' };
console.log('Valido:', validarEstudiante(ana));
console.log('Invalido:', validarEstudiante(estudianteInvalido));