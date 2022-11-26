import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { generate } from 'rxjs';
import { CredencialesModel } from 'src/app/Modelos/Credenciales.model';
import { DatosSesionModel } from 'src/app/Modelos/datos-sesion.model';
import { LocalStorageService } from 'src/app/servicios/shared/local-storage.service';
import { SeguridadService } from 'src/app/servicios/shared/seguridad.service';
const CryptoJS = require('crypto-js');
declare const GenerarVentanaModal: any;

@Component({
  selector: 'app-recuperar-pass',
  templateUrl: './recuperar-pass.component.html',
  styleUrls: ['./recuperar-pass.component.css']
})
export class RecuperarPassComponent implements OnInit {

  formularioLogin: FormGroup = new FormGroup({});
  constructor(
    private fb: FormBuilder,
    private servicioSeguridad: SeguridadService,
    private servicioLocalStorage: LocalStorageService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.ConstruccionFormulario();
  }

  ConstruccionFormulario() {
    this.formularioLogin = this.fb.group({
      usuario: ["fara202205@gmail.com", [Validators.required, Validators.email]],
      //pass: ["MinTic2022", [Validators.required]]
    });
  }

  Login() {
    if (this.formularioLogin.invalid) {
      GenerarVentanaModal("No es una dirección de correo electrónico válida")
    } else {
      let credenciales: CredencialesModel = new CredencialesModel();
      credenciales.usuario = this.formularioLogin.controls['usuario'].value;
      //credenciales.password = CryptoJS.MD5(this.formularioLogin.controls['pass'].value).toString();
      credenciales.password = this.formularioLogin.controls['pass'].value;
     //this.servicioLocalStorage.EliminarDatosSesion();
      this.servicioSeguridad.Login(credenciales).subscribe({
        next: (data: DatosSesionModel) => {
          console.log(data);
          let guardar=this.servicioLocalStorage.GuardarDatosSesion(data);
          data.estalogueado=true;
          this.servicioSeguridad.RefrescarDatosSesion(data);
          this.router.navigate(['/home']);
        },
        error: (e) => console.log(e)
      });
    }
  }
}