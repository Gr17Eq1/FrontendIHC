import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { ModeloInmueble } from 'src/app/Modelos/inmueble.modelo';
import { InmueblesService } from 'src/app/servicios/inmuebles.service';
declare const GenerarVentanaModal: any;

@Component({
  selector: 'app-crear-inmueble',
  templateUrl: './crear-inmueble.component.html',
  styleUrls: ['./crear-inmueble.component.css']
})
export class CrearInmuebleComponent implements OnInit {

  formularioCrear: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private servicioInmueble: InmueblesService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.ConstruccionFormulario();
  }


  ConstruccionFormulario() {
    this.formularioCrear = this.fb.group({

      codigoInm: [''],
      tipoInm: [''],
      tipoOferta: [''],
      valor: [''],
      imagenInm: [''],
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

    CrearInmueble() {
      let inmueble = new ModeloInmueble();
      /* no se incluye el id porque es creado por el comando CREATE dentro del método 
      'Inmueble model instance' en @post('/inmuebles') del BAckendIHC  */
      inmueble.codigoInm = parseFloat(this.formularioCrear.controls['codigoInm'].value);
      inmueble.tipoInm = this.formularioCrear.controls['tipoInm'].value;
      inmueble.tipoOferta = this.formularioCrear.controls['tipoOferta'].value;
      inmueble.valor = parseFloat(this.formularioCrear.controls['valor'].value);
      inmueble.imagenInm = this.formularioCrear.controls['imagenInm'].value;

      /* Los cinco campos anteriores son los que se capturan en la ventana HTML
      los siguientes 8 campos se asumirán en vacío y al futuro formarán parte de otros formularios */
      inmueble.ubicacionDepartamentoInm = this.formularioCrear.controls['ubicacionDepartamentoInm'].value;
      inmueble.ubicacionCiudadInm = this.formularioCrear.controls['ubicacionCiudadInm'].value;
      inmueble.direccionInm = this.formularioCrear.controls['direccionInm'].value;
      inmueble.linkYoutubeInm = this.formularioCrear.controls['linkYoutubeInm'].value;
      inmueble.participacion = parseFloat(this.formularioCrear.controls['participacion'].value);
      inmueble.estadoInm = this.formularioCrear.controls['estadoInm'].value;

      /* Creo que el problema del error 422 está en el formato de entrega de un campo tipo fecha
      modifique tanto en el Backend como en el Frontend el contenido de Modelo, 
      dejando en ambos casos este campo como string */
      inmueble.fechaActualizacion = this.formularioCrear.controls['fechaActualizacion'].value;
      inmueble.quienActualizo = this.formularioCrear.controls['quienActualizo'].value;
  
      this.servicioInmueble.CrearInmueble(inmueble).subscribe({
        next: (data: ModeloInmueble) => {
          GenerarVentanaModal("El registro del inmueble se realizó correctamente")
          this.router.navigate(["/administracion/buscar-inmueble"]);
        },
        error: (e) => {
          GenerarVentanaModal("¡¡¡¡¡¡El inmueble NO quedó registrado!!!!!!!")
          console.log(e)
        }
      });
    }
  }
