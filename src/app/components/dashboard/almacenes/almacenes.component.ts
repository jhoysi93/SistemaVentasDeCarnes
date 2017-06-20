import { Component, OnInit } from '@angular/core';
import { Almacen } from '../../../models/Almacen';
import { Item } from '../../../models/Item';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { AlmacenService } from '../../../services/firebase-services/almacen.service';


@Component({
  selector: 'app-almacenes',
  templateUrl: './almacenes.component.html',
  providers: [AlmacenService]
})
export class AlmacenesComponent implements OnInit {

  activarAgregarAlmacen:boolean = false;
  almacen: Almacen = new Almacen("");
  private formatoAlmacen: FormGroup;
  private listAlmacenes:Almacen[];

  constructor( private almacenService:AlmacenService) { 
    this.formatoAlmacen = new FormGroup({
      'nombre': new FormControl('', [Validators.required])
    });
  }

  ngOnInit() {
    this.almacenService.getAllAlmacen().subscribe( (almacenes) =>{
      this.listAlmacenes = almacenes;
      console.log(this.listAlmacenes);
    } );
  }

  guardarAlmacen(){
    console.log(this.formatoAlmacen.value);
    this.almacen.nombre = this.formatoAlmacen.value.nombre;
    this.almacen.items = new Array<Item>();
    this.almacenService.addAlmacen(this.almacen)
    .then( () =>{
      console.log("Almacen Agregado");
      this.almacen.nombre= "";
      this.activarAgregarAlmacen = false;
    })
    .catch( (error)  =>{
      console.log(error);
    } );
  }

}
