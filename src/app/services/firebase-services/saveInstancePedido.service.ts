import { Pedido } from '../../models/Pedido';
import { Injectable } from '@angular/core';

@Injectable()
export class SaveinstancePedido{

    private pedido: Pedido;
    public nombre: string = "";

    public saveInstance(pedido: Pedido, nombre:string){
        this.pedido = pedido;
        this.nombre = nombre;
    }

    public getPedido(){
        if(this.pedido){
            return this.pedido;
        }else{
            return null;
        }
    }

}