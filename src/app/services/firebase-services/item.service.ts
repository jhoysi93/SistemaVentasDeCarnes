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

    public addItem(item: Item, file: File) {

        
        if (file != null) {
            let tareaSubidaImagen = this.storageRef.child('/imgenes/' + file.name).put(file).then((dataImg) => {

                item.imagen = dataImg.downloadURL;
                item.borrado = false;
                console.log("Exitoso");
                this.itemPath.push(item);
            });
        }else{
                console.log(item);
                console.log("Exitoso");
                this.itemPath.push(item);
        }
    }

    public getAllItems() {
        return this.itemPath;
    }

    public getItem(key: string) {
        return this.db.object('/items/' + key);
    }

    public updateItem(key: string, item: Item, file:File) {

        console.log("update services Item");
        console.log(item);
        console.log("update services key");
        console.log(key);
        if(file != null){
            let tareaSubidaNuevaImagen = this.storageRef.child('/imgenes/' + file.name).put( file ).then( (imagen)=>{
                item.imagen = imagen.downloadURL;
                item.borrado = false;
                this.db.object('/items/' + key).update(item);
            });
        }else{

            return this.db.object('/items/' + key).update(item);
        }

    }

    public removeItem(key: string) {
        this.getItem(key).subscribe((data:Item) => {
            data.borrado = true;
            console.log("borrado");
            this.db.object('/items/' + key).update(data);
        });
    }

    public getItemCambioAlmacen(itemRestado: Item) {

        const alm = this.db.list('/items', {
            query: {
                //faltaba este para q busq la propiedad nombre en la lista de objetos 
                orderByChild: 'nombre',
                equalTo: itemRestado.nombre
            }
        });
        
        return alm;

    }

    public removeItemDef(key: string) {
        return this.getItem(key).subscribe((data) => {
            data.borrado = true;
            console.log("Borrado exitoso");
            this.db.object('/items/' + key).remove().then( () => {
                console.log("borradoDef")
            } );
        });
    }
}