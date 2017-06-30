import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Auth } from '../../../services/auth.service';


@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html'
})
export class MenuLateralComponent implements OnInit {

    perfil:Object;


  @Output()eventMenu = new EventEmitter<string>();

  constructor(private _auth:Auth) {
    this.perfil = this._auth.getProfile();

   }

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
