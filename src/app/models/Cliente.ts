

export class Cliente {

    constructor( private nombre: string, private nit: string, private direccion: string, private telefono: string ){

    }

    public getNombre (): string {
        return this.nombre;
    }
     public getNit (): string {
        return this.nit;
    }
     public getDireccion(): string {
        return this.direccion;
    }
     public getTelefono (): string {
        return this.telefono;
    }
}