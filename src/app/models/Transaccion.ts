

export class Transaccion {

    constructor(public idTransaccion: string, public idPedido: string,
        public idUsuario: string, public nitCliente: string,
        public detalle: string, public date: Date) {

    }

}