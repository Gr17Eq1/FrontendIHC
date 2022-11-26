import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ModeloInmueble } from '../Modelos/inmueble.modelo';
import { LocalStorageService } from './shared/local-storage.service';
import { SeguridadService } from './shared/seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class InmueblesService {

  tk: string = this.servicioLocalStorage.ObtenerToken();


  constructor(
    private http: HttpClient,
    private servicioSeguridad: SeguridadService,
    private servicioLocalStorage: LocalStorageService
  ) { }

  ObtenerInmuebles(): Observable<ModeloInmueble[]> {
    return this.http.get<ModeloInmueble[]>(`${this.servicioSeguridad.url}/inmuebles`)
  }

  CrearInmueble(inmueble: ModeloInmueble): Observable<ModeloInmueble> {
    return this.http.post<ModeloInmueble>(`${this.servicioSeguridad.url}/inmuebles`,
      {
        codigoInm: inmueble.codigoInm,
        ubicacionDepartamentoInm: inmueble.ubicacionDepartamentoInm,
        ubicacionCiudadInm: inmueble.ubicacionCiudadInm,
        direccionInm: inmueble.direccionInm,
        imagenInm: inmueble.imagenInm,

        linkYoutubeInm: inmueble.linkYoutubeInm,
        tipoInm: inmueble.tipoInm,
        tipoOferta: inmueble.tipoOferta,
        valor: inmueble.valor,
        participacion: inmueble.participacion,
        estadoInm: inmueble.estadoInm,
        fechaActualizacion: inmueble.fechaActualizacion,
        quienActualizo: inmueble.quienActualizo,
      },
      {
        headers: new HttpHeaders({
          'Authorization': `Bearer ${this.tk}`
        })
      });
  }

  ObtenerInmueble(id: string): Observable<ModeloInmueble> {
    return this.http.get<ModeloInmueble>(`${this.servicioSeguridad.url}/inmuebles/${id}`,
      {
        headers: new HttpHeaders({
          'Authorization': `Bearer ${this.tk}`
        })
      });
  }


  EditarInmueble(inmueble: ModeloInmueble): Observable<any> {
    return this.http.put<ModeloInmueble>(`${this.servicioSeguridad.url}/inmuebles/${inmueble.id}`, inmueble,
      {
        headers: new HttpHeaders({
          'Authorization': `Bearer ${this.tk}`
        })
      });
  }

  EliminarInmueble(id: string): Observable<any> {
    return this.http.delete(`${this.servicioSeguridad.url}/inmuebles/${id}`,
      {
        headers: new HttpHeaders({
          'Authorization': `Bearer ${this.tk}`
        })
      });
  }
}
