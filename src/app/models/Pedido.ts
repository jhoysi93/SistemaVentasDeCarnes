import { Item } from '../models/Item';

export class Pedido {

    constructor( public  idUsuario: string,
                 public  nitCliente: string, 
                 public  items:Item[], 
                 public  total: number, 
                 public  exitoso: boolean,
                 public  borrado?:boolean ){
    }
}