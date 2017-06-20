import { Item } from '../models/Item';

export class Pedido {

    constructor( private idUsuario: string,
                 private nitCliente: string, 
                 private items:Item[], 
                 private total: number, 
                 private exitoso: boolean,
                 private borrado?:boolean ){

    }

 
     public getIdUsuario (): string {
        return this.idUsuario;
    }
     public getNitCliente(): string {
        return this.nitCliente;
    }
     public getItems(): Item[] {
        return this.items;
    }
     public getTotal (): number {
        return this.total;
    }
    public getExitoso (): boolean {
        return this.exitoso;
    }
}