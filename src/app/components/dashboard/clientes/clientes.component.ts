import { Component, OnInit } from '@angular/core';
import { TransaccionService } from '../../../services/firebase-services/transaccion.service';
import { Transaccion } from '../../../models/Transaccion';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  providers: [ TransaccionService]
})
export class ClientesComponent implements OnInit {

  private listTransaccionesCliente:Transaccion[] = [];

  constructor(private transacSer:TransaccionService) { }

  ngOnInit() {
  }

  buscarPorNit(nitClienteStr:number){
    let nitCliente:number = Number(nitClienteStr);
    let transaccionesAux:Transaccion[]=[];
    if(nitCliente){
      this.transacSer.getTransaccionPorNit(nitCliente).subscribe( (transacciones)=>{
        transaccionesAux = transacciones;
      });
      setTimeout( ()=>{
        if(transaccionesAux.length > 0){
          this.listTransaccionesCliente = transaccionesAux;
        }else{
          console.log("no existe en transacciones del cliente")
        }
      }, 1200);
    }
  }

}
