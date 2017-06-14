import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Item } from '../../models/Item';


@Injectable()
export class ItemService{

 private itemPath: FirebaseListObservable<Item[]>;
    constructor(db: AngularFireDatabase) {
        this.itemPath = db.list('/item');
    }

     public addItem(item:Item){
       return this.itemPath.push(item);
    }

    public getAllItems(){
        return this.itemPath;
    }
}