import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ModeloInmueble } from 'src/app/Modelos/inmueble.modelo';
import { InmueblesService } from 'src/app/servicios/inmuebles.service';
declare const GenerarVentanaModal: any;

@Component({
  selector: 'app-editar-inmueble',
  templateUrl: './editar-inmueble.component.html',
  styleUrls: ['./editar-inmueble.component.css']
})
export class EditarInmuebleComponent implements OnInit {

  formularioEditar: FormGroup = new FormGroup({});
  constructor(
    private fb: FormBuilder,
    private servicioInmueble: InmueblesService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.ConstruccionFormulario();
    this.ConsultarInmueble();
  }

  ConstruccionFormulario() {
    this.formularioEditar = this.fb.group({
      id: [''],
      codigoInm: ['', [Validators.required]],
      tipoInm: ['', [Validators.required]],
      tipoOferta: ['', [Validators.required]],
      valor: ['', [Validators.required]],
      imagenInm: ['', [Validators.required]],
      ubicacionDepartamentoInm: [''],
      ubicacionCiudadInm: [''],
      direccionInm: [''],
      linkYoutubeInm: [''],
      participacion: [''],
      estadoInm: [''],
      fechaActualizacion: [''],
      quienActualizo: ['']
    })
  }

  ConsultarInmueble() {
    let id = this.route.snapshot.params["id"];
    this.servicioInmueble.ObtenerInmueble(id).subscribe({
      next: (datos: ModeloInmueble) => {
        this.formularioEditar.controls["id"].setValue(datos.id);
        this.formularioEditar.controls["codigoInm"].setValue(datos.codigoInm);
        this.formularioEditar.controls["tipoInm"].setValue(datos.tipoInm);
        this.formularioEditar.controls["tipoOferta"].setValue(datos.tipoOferta);
        this.formularioEditar.controls["valor"].setValue(datos.valor);
        this.formularioEditar.controls["imagenInm"].setValue(datos.imagenInm);
        this.formularioEditar.controls["ubicacionDepartamentoInm"].setValue(datos.ubicacionDepartamentoInm);
        this.formularioEditar.controls["ubicacionCiudadInm"].setValue(datos.ubicacionCiudadInm);
        this.formularioEditar.controls["direccionInm"].setValue(datos.direccionInm);
        this.formularioEditar.controls["linkYoutubeInm"].setValue(datos.linkYoutubeInm);
        this.formularioEditar.controls["participacion"].setValue(datos.participacion);
        this.formularioEditar.controls["estadoInm"].setValue(datos.estadoInm);
        this.formularioEditar.controls["fechaActualizacion"].setValue(datos.fechaActualizacion);
        this.formularioEditar.controls["quienActualizo"].setValue(datos.quienActualizo);
      },
      error: (e) => console.log(e)
    });
  }

  Editar() {
    let inmueble = new ModeloInmueble();
    inmueble.id = this.formularioEditar.controls["id"].value;
    inmueble.codigoInm = parseFloat(this.formularioEditar.controls["codigoInm"].value);
    inmueble.tipoInm = this.formularioEditar.controls["tipoInm"].value;
    inmueble.tipoOferta = this.formularioEditar.controls["tipoOferta"].value;
    inmueble.valor = parseFloat(this.formularioEditar.controls["valor"].value);
    inmueble.imagenInm = this.formularioEditar.controls["imagenInm"].value;
    inmueble.ubicacionDepartamentoInm = this.formularioEditar.controls["ubicacionDepartamentoInm"].value;
    inmueble.ubicacionCiudadInm = this.formularioEditar.controls["ubicacionCiudadInm"].value;
    inmueble.direccionInm = this.formularioEditar.controls["direccionInm"].value;
    inmueble.linkYoutubeInm = this.formularioEditar.controls["linkYoutubeInm"].value;
    inmueble.participacion = parseFloat(this.formularioEditar.controls["participacion"].value);
    inmueble.estadoInm = this.formularioEditar.controls["estadoInm"].value;
    inmueble.fechaActualizacion = this.formularioEditar.controls["fechaActualizacion"].value;
    inmueble.quienActualizo = this.formularioEditar.controls["quienActualizo"].value;

    this.servicioInmueble.EditarInmueble(inmueble).subscribe({
      next: (data: any) => {
        GenerarVentanaModal("El inmueble se actualizó correctamente");
        this.router.navigate(["/administracion/buscar-inmueble"]);
      },
      error: (e) => {
        GenerarVentanaModal("¡¡¡¡¡¡El inmueble no quedó actualizado!!!!!!!")
        console.log(e)
      }
    });
  }


}
