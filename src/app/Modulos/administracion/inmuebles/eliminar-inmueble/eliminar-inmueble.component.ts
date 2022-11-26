import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModeloInmueble } from 'src/app/Modelos/inmueble.modelo';
import { InmueblesService } from 'src/app/servicios/inmuebles.service';
declare const GenerarVentanaModal: any;

@Component({
  selector: 'app-eliminar-inmueble',
  templateUrl: './eliminar-inmueble.component.html',
  styleUrls: ['./eliminar-inmueble.component.css']
})
export class EliminarInmuebleComponent implements OnInit {

  inmueble: ModeloInmueble = new ModeloInmueble();
  id: string = this.route.snapshot.params['id'];

  constructor(
    private servicioInmueble: InmueblesService,
    private route: ActivatedRoute,
    private router: Router

  ) { }

  ngOnInit(): void {
    this.servicioInmueble.ObtenerInmueble(this.id).subscribe({
      next: (data: ModeloInmueble) => {
        this.inmueble = data
      }
    });
  }


  EliminarInmueble() {
    this.servicioInmueble.EliminarInmueble(this.id).subscribe({
      next: (data: any) => {
        GenerarVentanaModal("El inmueble se ha eliminado");
        this.router.navigate(["/administracion/buscar-inmueble"]);
      },
      error: (e) => {
        GenerarVentanaModal("¡¡¡¡¡¡El inmueble NO quedó eliminado!!!!!!!")
        console.log(e)
      }
    });
  }
}
