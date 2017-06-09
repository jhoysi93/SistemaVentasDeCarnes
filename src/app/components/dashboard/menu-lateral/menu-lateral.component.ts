import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html'
})
export class MenuLateralComponent implements OnInit {

  @Output()eventMenu = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }


//metodos para abrir el menu, si se puede simplificar en un solo metodo
  clickPedidos(){
    this.eventMenu.emit("pedidos");
  }
  clickDespachos(){
    this.eventMenu.emit("despachos");
  }
  clickPrecios(){
    this.eventMenu.emit("precios");
  }
  clickClientes(){
    this.eventMenu.emit("clientes");
  }
  clickProduccion(){
    this.eventMenu.emit("produccion");
  }
  clickAlmacenes(){
    this.eventMenu.emit("almacenes");
  }
  clickCobros(){
    this.eventMenu.emit("cobros");
  }
}
