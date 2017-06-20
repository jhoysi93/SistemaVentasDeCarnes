import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Item } from '../../models/Item';


@Injectable()
export class ItemService {

    private itemPath: FirebaseListObservable<Item[]>;
    constructor(private db: AngularFireDatabase) {
        this.itemPath = db.list('/items');
    }

    public addItem(item: Item) {
        return this.itemPath.push(item);
    }

    public getAllItems() {
        return this.itemPath;
    }

    public getItem(key: string) {
        return this.db.object('/items/' + key);
    }
}