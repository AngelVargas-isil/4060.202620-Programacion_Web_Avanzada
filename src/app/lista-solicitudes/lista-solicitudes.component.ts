import { Component } from '@angular/core';
import { Solicitud } from '../models/solicitud.model';
import { SolicitudService } from '../services/solicitud.service';

@Component({
  selector: 'app-lista-solicitudes',
  templateUrl: './lista-solicitudes.component.html',
  styleUrls: ['./lista-solicitudes.component.css']
})
export class ListaSolicitudesComponent {
  lista: Solicitud[] = [];
  resumenes: string[] = [];

  constructor(private solicitudService: SolicitudService){}

  ngOnInit(){
    this.lista = this.solicitudService.obtenerSolicitudes();
    this.resumenes = this.solicitudService.obtenerResumenes();
  }

}
