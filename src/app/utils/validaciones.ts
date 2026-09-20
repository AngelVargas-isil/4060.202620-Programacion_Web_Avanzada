import { Estudiante } from '../models/solicitud.model';

export const esCorreoValido = (correo: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);

export const validarEstudiante = (estudiante: Estudiante): string[] => {
  const errores: string[] = [];
  if (!estudiante.nombre.trim()) errores.push('El nombre es obligatorio');
  if (!estudiante.codigo.trim()) errores.push('El código es obligatorio');
  if (!esCorreoValido(estudiante.correo)) errores.push('El correo no es válido');
  return errores;
};