import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Item } from '../../models/Item';
import * as firebase from 'firebase';


@Injectable()
export class ItemService {

    private itemPath: FirebaseListObservable<Item[]>;
    private storageRef: firebase.storage.Reference;

    constructor(private db: AngularFireDatabase) {
        this.itemPath = db.list('/items');
        this.storageRef = firebase.storage().ref();
    }

    public addItem(item: Item, file:File) {
        let tareaSubidaImagen = this.storageRef.child('/imgenes/' + file.name).put(file).then( (dataImg) => {
            let itemAux:Item = new Item(item.getNombre, item.getPrecio,
                                        item.getCantidad, item.getDetalle,
                                        item.getTipoAlmacen, dataImg.downloadURL, false);
            console.log("Exitoso");
            this.itemPath.push(itemAux);
        });
    }

    public getAllItems() {
        return this.itemPath;
    }

    public getItem(key: string) {
        return this.db.object('/items/' + key);
    }

    public updateItem(key:string, item: Item) {
        return this.db.object('/items/' + key).update(item);
    }
}