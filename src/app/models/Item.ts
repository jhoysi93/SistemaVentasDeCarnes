

export class Item {

    private _nombre: string;
    private _precio: number;
    private _cantidad: number;
    private _detalle: string;
    private _tipoAlmacen?: string;
    private _imagen?: string;
    private _borrado?: boolean;

    constructor( nombre: string,  precio: number, cantidad: number,detalle: string,  tipoAlmacen?: string,
                imagen?: string,  borrado?: boolean) {
        this._nombre = nombre;
        this._precio = precio;
        this._cantidad = cantidad;
        this._detalle = detalle;
        this._tipoAlmacen = tipoAlmacen;
        this._imagen = imagen;
        this._borrado = borrado;

    }

    get getNombre(): string {
        return this._nombre;
    }
    get getPrecio(): number {
        return this._precio;
    }
    get getCantidad(): number {
        return this._cantidad;
    }
    get getTipoAlmacen(): string {
        return this._tipoAlmacen;
    }
    get getDetalle(): string {
        return this._detalle;
    }
    get getImagen(): string {
        return this._imagen;
    }
    get getBorrado(): boolean {
        return this._borrado;
    }

//////setters
    set setNombre(nombre: string){
         this._nombre = nombre;
    }

    set setPrecio(precio: number){
         this._precio = precio;
    }
    set setCantidad(cantidad: number){
         this._cantidad = cantidad;
    }
    set setTipoAlmacen(tipoAlmacen: string){
         this._tipoAlmacen = tipoAlmacen;
    }
    set setDetalle(detalle: string){
         this._detalle = detalle;
    }
    set setImagen(imagen: string){
         this._imagen = imagen;
    }
    set setBorrado(borrado: boolean){
         this._borrado = borrado;
    }

}