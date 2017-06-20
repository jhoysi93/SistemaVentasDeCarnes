import { Item } from '../models/Item';


export class Almacen {
    private _nombre: string;
    private _items: Item[];

    constructor(nombre: string, items?: Item[]) {
        this._nombre = nombre;
        this._items = items;

    }

    /* public getNombre (): string {
         return this.nombre;
     }
      public getItem (): Item[] {
         return this.items;
     }*/

    get nombre(): string {
        return this._nombre;
    }
   
    get items(): Item[] {
        return this._items;
    }

    set nombre( nombre:string )  {
        this._nombre = nombre;
    }
  
    set items( items:Item[] )  {
        this._items = items;
    }
}