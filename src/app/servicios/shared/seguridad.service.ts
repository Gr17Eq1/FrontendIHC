import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CredencialesModel } from 'src/app/Modelos/Credenciales.model';
import { DatosSesionModel } from 'src/app/Modelos/datos-sesion.model';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class SeguridadService {
  url: String = "https://grupo17equipo1bk.herokuapp.com";
  sesionInfo: BehaviorSubject<DatosSesionModel> = new BehaviorSubject<DatosSesionModel>(new DatosSesionModel());

  constructor(
    private http: HttpClient,
    private servicioLocalStorage: LocalStorageService
  ) { 
    this.VerificarSesionActiva();
  }

  Login(credenciales: CredencialesModel): Observable<any> {
    return this.http.post(`${this.url}/Login`, credenciales);
  }

  VerificarSesionActiva() {
    let info = this.servicioLocalStorage.ObtenerDatosSesion();
    if (info) {
      info.estalogueado = true;
      this.RefrescarDatosSesion(info);
      return true;
    } else {
      return false;
    }
  }

  RefrescarDatosSesion(datos: DatosSesionModel) {
    this.sesionInfo.next(datos);
  }

  ObtenerInfoSesion() {
    return this.sesionInfo.asObservable();
  }

  
}
