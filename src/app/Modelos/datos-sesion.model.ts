import { DatosUserModel } from "./datos-user.model";

export class DatosSesionModel{
    info?: DatosUserModel;
    tk?: string;
    estalogueado:boolean=false;
}