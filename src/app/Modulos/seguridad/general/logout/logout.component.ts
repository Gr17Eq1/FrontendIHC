import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatosSesionModel } from 'src/app/Modelos/datos-sesion.model';
import { LocalStorageService } from 'src/app/servicios/shared/local-storage.service';
import { SeguridadService } from 'src/app/servicios/shared/seguridad.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(
    private servicioLocalStorage:LocalStorageService,
    private servicioSeguridad: SeguridadService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.servicioLocalStorage.EliminarDatosSesion();
    this.servicioSeguridad.RefrescarDatosSesion(new DatosSesionModel());
    this.router.navigate(['/home']);
  }

}
