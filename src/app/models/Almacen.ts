import { Item } from '../models/Item';


export class Almacen {

    constructor( private nombre: string, private items?: Item[]){

    }

    public getNombre (): string {
        return this.nombre;
    }
     public getItem (): Item[] {
        return this.items;
    }
}