import { Precio } from '../../models/Precio';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Injectable()
export class PrecioService {

    private preciosPath: FirebaseListObservable<Precio[]>;

    constructor(private db: AngularFireDatabase) {
        this.preciosPath = db.list('/precios/');
    }


    public addPrecio(precio: Precio){
        return this.preciosPath.push(precio);
    }
}