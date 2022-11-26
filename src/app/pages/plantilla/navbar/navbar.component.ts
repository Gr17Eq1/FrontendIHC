import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DatosSesionModel } from 'src/app/Modelos/datos-sesion.model';
import { SeguridadService } from 'src/app/servicios/shared/seguridad.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  sesionActiva: boolean = false;
  subscripcion: Subscription = new Subscription();

  constructor(
    private servicioSeguridad: SeguridadService
  ) { }

  ngOnInit(): void {
    this.EstadoSesion();
  }

  EstadoSesion() {
    this.subscripcion = this.servicioSeguridad.ObtenerInfoSesion().subscribe({
      next: (data: DatosSesionModel) => {
        this.sesionActiva=data.estalogueado;
      }
    });
  }
}
