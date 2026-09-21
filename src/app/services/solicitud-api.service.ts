import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UsuarioApi } from '../models/solicitud-api.model';
import { Solicitud, TipoSolicitud, EstadoSolicitud } from '../models/solicitud.model';

@Injectable({ providedIn: 'root' })
export class SolicitudApiService {
  private readonly url = 'https://jsonplaceholder.typicode.com/users';

  private readonly tipos: TipoSolicitud[] = ['constancia', 'retiro_curso', 'reincorporacion', 'convalidacion'];
  private readonly estados: EstadoSolicitud[] = ['pendiente', 'en_proceso', 'aprobada', 'rechazada'];

  constructor(private http: HttpClient) {}

  // Consume la API y adapta la respuesta a nuestro modelo Solicitud.
  listar(): Observable<Solicitud[]> {
    return this.http.get<UsuarioApi[]>(this.url).pipe(
      map(usuarios => usuarios.map(u => this.aSolicitud(u)))
    );
  }

  private aSolicitud(u: UsuarioApi): Solicitud {
    return {
      id: u.id,
      estudiante: { id: u.id, nombre: u.name, codigo: u.username, correo: u.email },
      tipo: this.tipos[u.id % this.tipos.length],
      estado: this.estados[u.id % this.estados.length],
      descripcion: 'Solicitud importada desde la API de práctica',
      fecha: new Date()
    };
  }
}
