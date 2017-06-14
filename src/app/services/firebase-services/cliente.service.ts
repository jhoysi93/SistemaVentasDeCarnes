import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Cliente } from '../../models/Cliente';


@Injectable()
export class ClienteService{

 private clientePath: FirebaseListObservable<Cliente[]>;
    constructor(db: AngularFireDatabase) {
        this.clientePath = db.list('/cliente');
    }

     public addCliente(cliente:Cliente){
       return this.clientePath.push(cliente);
    }

    public getAllClientes(){
        return this.clientePath;
    }
}