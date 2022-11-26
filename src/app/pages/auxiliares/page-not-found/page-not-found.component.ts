import { Component, OnInit } from '@angular/core';
declare const GenerarVentanaModal:any;

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    GenerarVentanaModal("La página a la que intenta acceder aún no existe")
  }

}
