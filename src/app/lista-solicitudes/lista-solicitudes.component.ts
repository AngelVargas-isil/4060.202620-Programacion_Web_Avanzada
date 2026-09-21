import { Component } from '@angular/core';
import { Solicitud } from '../models/solicitud.model';
import { SolicitudService } from '../services/solicitud.service';

@Component({
  selector: 'app-lista-solicitudes',
  templateUrl: './lista-solicitudes.component.html',
  styleUrls: ['./lista-solicitudes.component.css']
})
export class ListaSolicitudesComponent {

  constructor(private solicitudService: SolicitudService){}

  get lista(): Solicitud[] {
    return this.solicitudService.obtenerSolicitudes();
  }

  get resumenes(): string[] {
    return this.solicitudService.obtenerResumenes();
  }

}
