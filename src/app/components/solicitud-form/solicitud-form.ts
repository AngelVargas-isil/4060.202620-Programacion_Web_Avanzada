import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SolicitudService } from '../../services/solicitud.service';

@Component({
  selector: 'app-solicitud-form',
  templateUrl: './solicitud-form.html',
  styleUrls: ['./solicitud-form.css']
})
export class SolicitudFormComponent {

  formulario = this.fb.group({
    nombre: ['', Validators.required],

    codigo: ['', Validators.required],

    correo: ['', [
      Validators.required,
      Validators.email
    ]],

    tipo: ['', Validators.required],

    descripcion: ['', [
      Validators.required,
      Validators.minLength(10)
    ]]
  });

  mensaje = '';

  constructor(private fb: FormBuilder, private solicitudService: SolicitudService) {}

  registrarSolicitud(): void {

    this.mensaje = '';

    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    const { nombre, codigo, correo, tipo, descripcion } = this.formulario.value;
    this.solicitudService.agregar({
      nombre: nombre ?? '',
      codigo: codigo ?? '',
      correo: correo ?? '',
      tipo: tipo ?? '',
      descripcion: descripcion ?? ''
    });

    this.mensaje = 'Solicitud registrada correctamente.';

    this.formulario.reset({ nombre: '', codigo: '', correo: '', tipo: '', descripcion: '' });
  }

}