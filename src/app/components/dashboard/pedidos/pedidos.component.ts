import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styles: []
})
export class PedidosComponent implements OnInit {

  activarProductos: boolean = false;
  constructor() { }

  ngOnInit() {
  }

  mostrarProductos(){
    this.activarProductos = !this.activarProductos;
  }

}
