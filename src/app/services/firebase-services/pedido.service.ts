import { DespachoItems } from '../../models/Despacho';
import { Pedido } from '../../models/Pedido';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { ItemService } from '../firebase-services/item.service';
import { Item } from '../../models/Item';



@Injectable()
export class PedidosService {

    private pedidoPath: FirebaseListObservable<Pedido[]>;
    constructor(private db: AngularFireDatabase, private itemSer: ItemService) {
        this.pedidoPath = db.list('/pedidos');
    }

    public addPedido(pedido: Pedido) {
        return this.pedidoPath.push(pedido);
    }

    public getAllPedidos() {
        return this.pedidoPath;
    }


    public cancelarPedido(despachoItems: DespachoItems[]) {

        let itemAux: any[];
        const r = this.itemSer.getAllItems().subscribe((listItem: any[]) => {
            itemAux = listItem;
        });
        setTimeout(() => {

            for (let i = 0; i < despachoItems.length; i++) {
                for (let j = 0; j < itemAux.length; j++) {
                    if (itemAux[j].$key == despachoItems[i].keyItem) {
                        itemAux[j].cantidad += despachoItems[i].item.cantidad;
                        this.itemSer.updateItem(itemAux[j].$key, itemAux[j], null);
                        break;
                    }
                }
            }
        }, 2000);



    }

    public getPedido(key:string){
        return this.db.object('/pedidos/' + key);
    }

    public updatePedido(key:string, newPedido:Pedido){
        return this.db.list('/pedidos/').update(key, newPedido);
    }
}

