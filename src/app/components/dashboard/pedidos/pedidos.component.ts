import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Cliente } from '../../../models/Cliente';
import { Item } from '../../../models/Item';
import { Pedido } from '../../../models/Pedido';
import { Usuario } from '../../../models/Usuario';
import { ItemService } from '../../../services/firebase-services/item.service';
import { PedidosService } from '../../../services/firebase-services/pedido.service';
import { Auth } from '../../../services/auth.service';




@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  providers: [ItemService, PedidosService, Auth],
  styles: []
})
export class PedidosComponent implements OnInit {

  @ViewChild('cerrarAgregar') closeModal: ElementRef;

  activarProductos: boolean = false;
  private formatoCliente: FormGroup;
  private listItems: Item[] = [];
  private itemKey:string = "";
  private item:Item = new Item("", 0, 0, "", "", "", false);
  private listItemsPedido: Item[] = [];
  




  constructor(private itemSer: ItemService, private pedidoSer: PedidosService, auth: Auth) {

    this.formatoCliente = new FormGroup({
      'nombre': new FormControl('', [Validators.required]),
      'nit': new FormControl('', [Validators.required])
    });
  }

  ngOnInit() {
    this.itemSer.getAllItems().subscribe(( items ) => {
      this.listItems = items;
    });
  }

   setDetalleKey(itemKey: string) {
    this.itemKey = itemKey;
    this.itemSer.getItem(itemKey).subscribe( ( item:Item ) => {
       this.item = item;
    });
   }

  setEditKey(itemKey: string) {
    this.itemKey = itemKey;
   }

  
  agregarItems(cantidadStr:number){
    let cantidad:number = Number(cantidadStr);

    if( cantidad > 0 ){

       this.itemSer.getItem(this.itemKey).subscribe( (item:Item) => {
        if( item.cantidad >= cantidad ){
           item.cantidad = item.cantidad - cantidad;
        }
    });

    }
    

  }

  guardarPedido(){

  }

 



}
