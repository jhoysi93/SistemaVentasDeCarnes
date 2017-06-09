

export class Usuario {

    constructor( private nombre: string, private correo: string, private tipoUsuario: string, private idUsuario: string ){

    }

    public getNombre (): string {
        return this.nombre;
    }
     public getCorreo (): string {
        return this.correo;
    }
     public getTipoUsuario(): string {
        return this.tipoUsuario;
    }
     public getIdUsuario (): string {
        return this.idUsuario;
    }
}