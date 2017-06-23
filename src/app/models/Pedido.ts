import { Item } from '../models/Item';
import { DespachoItems } from '../models/Despacho';

export class Pedido {

    constructor( public  idUsuario: string,
                 public  nitCliente: string, 
                 public  despachoItems:DespachoItems[], 
                 public  total: number, 
                 public  exitoso: boolean,
                 public  borrado?:boolean ){
    }
}