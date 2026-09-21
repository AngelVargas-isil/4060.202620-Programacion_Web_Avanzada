import { Component, OnInit } from '@angular/core';
import { Solicitud } from '../../models/solicitud.model';
import { SolicitudApiService } from '../../services/solicitud-api.service';

@Component({
  selector: 'app-solicitudes-remotas',
  templateUrl: './solicitudes-remotas.component.html',
  styleUrls: ['./solicitudes-remotas.component.css']
})
export class SolicitudesRemotasComponent implements OnInit {
  datos: Solicitud[] = [];
  cargando = true;
  error = '';

  constructor(private api: SolicitudApiService) {}

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.cargando = true;
    this.error = '';
    this.api.listar().subscribe({
      next: (res) => {
        this.datos = res;
        this.cargando = false;
      },
      error: () => {
        this.error = 'No se pudieron cargar los datos desde la API.';
        this.cargando = false;
      }
    });
  }
}
