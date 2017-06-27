import { Component, OnInit } from '@angular/core';
import { PedidosService } from '../../../services/firebase-services/pedido.service';
import { Pedido } from '../../../models/Pedido';

@Component({
  selector: 'app-despachos',
  templateUrl: './despachos.component.html',
  providers:[PedidosService]
})
export class DespachosComponent implements OnInit {

  private listaPedidos:Pedido[];
  constructor(private pedidoSer:PedidosService) { }

  ngOnInit() {
    this.pedidoSer.getAllPedidos().subscribe( (pedido:Pedido[])=>{
      this.listaPedidos = pedido;
    });
  }

  despacharPedido(pedidoKey: string, despacho:boolean){
    console.log(pedidoKey);
    let pedidoAux:Pedido;
    this.pedidoSer.getPedido(pedidoKey).subscribe( (pedido) =>{
      pedidoAux = pedido;
    });
    setTimeout( ()=>{
      pedidoAux.despachoExitoso = despacho;
      this.pedidoSer.updatePedido(pedidoKey, pedidoAux).then( ()=>console.log("pedido exitoso")).catch((error)=>console.log(error));
    }, 1100);
  }


  eliminarPedido(pedidoKey:string){
    let pedidoAux:Pedido;
       this.pedidoSer.getPedido(pedidoKey).subscribe( (pedido) =>{
      pedidoAux = pedido;
    });
    setTimeout( ()=>{
      pedidoAux.despachoExitoso = false;
      pedidoAux.borrado = true;
      this.pedidoSer.cancelarPedido(pedidoAux.despachoItems);
      this.pedidoSer.updatePedido(pedidoKey, pedidoAux).then( ()=>console.log("pedido exitoso")).catch((error)=>console.log(error));
    }, 1100);
  }

}
