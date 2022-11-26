import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DesautorizarGuard } from 'src/app/Guardianes/desautorizar.guard';
import { PageNotFoundComponent } from 'src/app/pages/auxiliares/page-not-found/page-not-found.component';
import { LoginComponent } from './general/login/login.component';
import { LogoutComponent } from './general/logout/logout.component';
import { BuscarUserComponent } from './usuarios/buscar-user/buscar-user.component';
import { CrearUserComponent } from './usuarios/crear-user/crear-user.component';
import { EditarUserComponent } from './usuarios/editar-user/editar-user.component';

const routes: Routes = [

  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "registro",
    component: CrearUserComponent,
    
  },
  {
    path: "cambio-pass",
    component: EditarUserComponent
  },
  {
    path: "recuperar-pass",
    component: BuscarUserComponent
  },
  {
    path:"logout",
    component:LogoutComponent
  },
  {
    path:"**",
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeguridadRoutingModule { }
