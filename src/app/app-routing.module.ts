import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SolicitudFormComponent } from './components/solicitud-form/solicitud-form';
import { InicioComponent } from './components/inicio/inicio.component';
import { SolicitudesRemotasComponent } from './components/solicitudes-remotas/solicitudes-remotas.component';

const routes: Routes = [
  {
    path: '',
    component: InicioComponent
  },
  {
    path: 'solicitudes/nueva',
    component: SolicitudFormComponent
  },
  {
    path: 'externas',
    component: SolicitudesRemotasComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
