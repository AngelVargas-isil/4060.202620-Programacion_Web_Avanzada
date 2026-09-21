import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SolicitudFormComponent } from './components/solicitud-form/solicitud-form';
import { InicioComponent } from './components/inicio/inicio.component';
import { ListaSolicitudesComponent } from './lista-solicitudes/lista-solicitudes.component';
import { SolicitudesRemotasComponent } from './components/solicitudes-remotas/solicitudes-remotas.component';

@NgModule({
  declarations: [
    AppComponent,
    SolicitudFormComponent,
    InicioComponent,
    ListaSolicitudesComponent,
    SolicitudesRemotasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
