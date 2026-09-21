import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

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

  constructor(private fb: FormBuilder) {}

  registrarSolicitud(): void {

    this.mensaje = '';

    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    this.mensaje = 'Solicitud registrada correctamente.';

    console.log('Solicitud válida:', this.formulario.value);
  }

}