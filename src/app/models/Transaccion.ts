

export class Transaccion {

    constructor(private idTransaccion: string, private idPedido: string,
        private idUsuario: string, private nitCliente: string,
        private detalle: string, private date: Date) {

    }

    public getidTransaccion(): string {
        return this.idTransaccion;
    }
    public getidPedido(): string {
        return this.idPedido;
    }
    public getIdUsuario(): string {
        return this.idUsuario;
    }
    public getNitCliente(): string {
        return this.nitCliente;
    }
    public getDetalle(): string {
        return this.detalle;
    }
    public getDate(): string {
        let date:Date = new Date();
        let resDate:string = `Año : ${date.getFullYear()} 
                              Mes: ${date.getMonth()+1} 
                              Dia: ${date.getDate()} 
                              Hora: ${date.getHours()}`;
        return resDate;
    }
}