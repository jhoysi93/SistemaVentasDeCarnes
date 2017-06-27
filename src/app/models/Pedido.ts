import { Item } from '../models/Item';
import { DespachoItems } from '../models/Despacho';

export class Pedido {

    constructor( public  idUsuario: string,
                 public  nombreCliente:string,
                 public  nitCliente: number, 
                 public  despachoItems:DespachoItems[], 
                 public  total: number, 
                 public  descuento:number,
                 public  totalFinal:number,
                 public  despachoExitoso: boolean,
                 public  ventaExitosa: boolean,
                 public  borrado:boolean ){
    }
}