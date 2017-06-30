

export class Transaccion {

    constructor(public idPedido: string,
        public idUsuario: string, 
        public nombreCliente:string,
        public nitCliente: string,
        public totalAnterior: number, 
        public porcentajeDescsuento: number,
        public totalFinal: number, 
        public detalle: string,
        public date: string) {

    }

}