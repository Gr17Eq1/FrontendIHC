import { Injectable } from '@angular/core';
import { DatosSesionModel } from 'src/app/Modelos/datos-sesion.model';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  GuardarDatosSesion(datos: DatosSesionModel) {
    let datosActuales = localStorage.getItem("datossesionIHC");
    if (datosActuales) {
      return false;
    } else {
      let datossesionString = JSON.stringify(datos);
      localStorage.setItem("datossesionIHC", datossesionString);
      return true;
    }
  }

  EliminarDatosSesion() {
    let datosActuales = localStorage.getItem("datossesionIHC");
    if (datosActuales) {
      localStorage.removeItem("datossesionIHC");
      return true;
    } else {
      return false;
    }
  }

  ObtenerToken(): string {
    let datosActuales = localStorage.getItem("datossesionIHC");
    if (datosActuales) {
      let datossesionJSON=JSON.parse(datosActuales);
      return datossesionJSON.tk;
    } else {
      return "";      
    }
  }

  ObtenerDatosSesion():DatosSesionModel | null{
    let datosActuales=localStorage.getItem("datossesionIHC");
    if (datosActuales) {
      let datossesionJSON=JSON.parse(datosActuales);
      return datossesionJSON;
    } else {
      return null;
    }
  }
}
