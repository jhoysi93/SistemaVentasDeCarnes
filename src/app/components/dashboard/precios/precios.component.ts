import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-precios',
  templateUrl: './precios.component.html',
  styles: []
})
export class PreciosComponent implements OnInit {

  activarProductosPollo: boolean = false;
  activarProductosCarneRes: boolean = false;
  activarProductosCarneCerdo: boolean = false;
  constructor() { }

  ngOnInit() {
  }

   mostrarProductosPollo(){
    this.activarProductosPollo = !this.activarProductosPollo;
  }
   mostrarProductosCarneRes(){
    this.activarProductosCarneRes = !this.activarProductosCarneRes;
  }
   mostrarProductosCarneCerdo(){
    this.activarProductosCarneCerdo = !this.activarProductosCarneCerdo;
  }

}
