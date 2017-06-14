import { Pedido } from '../../models/Pedido';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';



@Injectable()
export class PedidosService {

    private pedidoPath: FirebaseListObservable<Pedido[]>;
    constructor(db: AngularFireDatabase) {
        this.pedidoPath = db.list('/pedidos');
    }

    public addPedido(pedido:Pedido){
       return this.pedidoPath.push(pedido);
    }

    public getAllPedidos(){
        return this.pedidoPath;
    }
}

