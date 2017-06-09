

export class Item {

    constructor(private nombre: string, private precio: string,
        private idItem: string, private cantidad: string,
        private tipoAlmacen: string, private detalle: string) {

    }

    public getNombre(): string {
        return this.nombre;
    }
    public getPrecio(): string {
        return this.precio;
    }
    public getIdItem(): string {
        return this.idItem;
    }
    public getcantidad(): string {
        return this.cantidad;
    }
    public getTipoAlmacen(): string {
        return this.tipoAlmacen;
    }
    public getDetalle(): string {
        return this.detalle;
    }
}