import { Pedido } from '../../models/Pedido';
import { Injectable } from '@angular/core';

@Injectable()
export class SaveinstancePedido{

    private pedido: Pedido;

    public saveInstance(pedido: Pedido){
        this.pedido = pedido;
    }

    public getPedido(){
        if(this.pedido){
            return this.pedido;
        }else{
            return null;
        }
    }

}