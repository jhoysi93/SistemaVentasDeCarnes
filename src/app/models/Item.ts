

export class Item {



    constructor( public nombre: string,  
                 public precio: number, 
                 public cantidad: number,
                 public detalle: string, 
                 public tipoAlmacen?: string, 
                 public imagen?: string,  
                 public borrado?: boolean) {

    }


}