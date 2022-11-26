import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../servicios/shared/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AutorizacionGuard implements CanActivate {

  constructor(
    private servicioLocalStorage: LocalStorageService,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let token = this.servicioLocalStorage.ObtenerToken();
    /* Si token es vacío, la sesión ya está iniciada por alguien y la verificación
    es volver a registrar credenciales de login */
    if (token == "") {
      this.router.navigate(['/seguridad/login']);
      return false;
    } else {
      return true;
    }
    /* Extraer del token el cargo para dar permisos. 
    Construir un AutorizationGuard por cada cargo*/
  }

}
