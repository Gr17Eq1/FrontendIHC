import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutorizacionGuard } from './Guardianes/autorizacion.guard';
import { SeguridadModule } from './Modulos/seguridad/seguridad.module';
import { HomePageComponent } from './pages/auxiliares/home-page/home-page.component';
import { PageNotFoundComponent } from './pages/auxiliares/page-not-found/page-not-found.component';


const routes: Routes = [
  {
    path:"home",
    component: HomePageComponent
  },
  {
    path:"",
    pathMatch:"full",
    redirectTo:"/home"
  },
  {
    path:"seguridad",
    loadChildren: ()=> import("./Modulos/seguridad/seguridad.module").then(x=>x.SeguridadModule)
  },
  {
    path:"home/seguridad/login",
    pathMatch:"full",
    redirectTo:"/seguridad/login"
  },
  {
    path:"administracion",
    loadChildren: ()=> import("./Modulos/administracion/administracion.module").then(x=>x.AdministracionModule),
    canActivate: [AutorizacionGuard]
  },
  {
    path:"**",
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
