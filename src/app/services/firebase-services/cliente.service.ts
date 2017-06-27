import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Cliente } from '../../models/Cliente';


@Injectable()
export class ClienteService {

    private clientePath: FirebaseListObservable<Cliente[]>;
    constructor( private db: AngularFireDatabase) {
        this.clientePath = db.list('/clientes');
    }

    public addCliente(cliente: Cliente) {
        
        const ruta =  this.db.list('/clientes/', {
            query:{
                orderByChild: 'nit',
                equalTo: cliente.nit
            }
        });

        ruta.subscribe( ( listClientes ) =>{
            if( listClientes.length < 1 ){
                console.log("push del cliente ");
                return this.clientePath.push(cliente);
            }else{

                console.log("else nada cliente ");
                return;
            }
        });

    }

    public getAllClientes() {
        return this.clientePath;
    }


}