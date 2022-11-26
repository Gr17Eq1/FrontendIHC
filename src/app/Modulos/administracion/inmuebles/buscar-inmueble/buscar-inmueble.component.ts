import { Component, OnInit } from '@angular/core';
import { ModeloInmueble } from 'src/app/Modelos/inmueble.modelo';
import { InmueblesService } from 'src/app/servicios/inmuebles.service';

@Component({
  selector: 'app-buscar-inmueble',
  templateUrl: './buscar-inmueble.component.html',
  styleUrls: ['./buscar-inmueble.component.css']
})
export class BuscarInmuebleComponent implements OnInit {

  p: number = 1;
  pageSize: number = 3;
  totalAmount: number = 0;

  listadoRegistros: ModeloInmueble[] = [];

  constructor(
    private inmuebleServicio: InmueblesService
  ) { }

  ngOnInit(): void {
    this.ObtenerListadoInmuebles();
  }

  ObtenerListadoInmuebles() {
    this.inmuebleServicio.ObtenerInmuebles().subscribe({
      next: (datos: ModeloInmueble[]) => {
        this.listadoRegistros = datos;
        this.totalAmount = this.listadoRegistros.length;
      },
      error: (e) => console.log(e)
    });
  }
}
