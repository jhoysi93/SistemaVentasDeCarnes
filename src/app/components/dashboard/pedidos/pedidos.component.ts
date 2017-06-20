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
  private cliente: Cliente;
  private listItems:Item[] = [];
  private itemDetalle: Item;
  private listItemsPedido:Item[] = [];
  private cantidad: number;
  private pedido: Pedido;
  private usuario:Usuario;
  private totales: number[] =[0];
  private total: number = 0;

  

  constructor( private itemSer: ItemService, private pedidoSer: PedidosService, auth: Auth) {

    this.usuario = new Usuario(auth.getProfile().user_metadata.apodo,
                               auth.getProfile().email,
                               auth.getProfile().user_metadata.tipo_user,
                               auth.getProfile().user_id );
    this.cliente = new Cliente('', '');
    this.itemDetalle = new Item("", 1, 12, "");
    this.formatoCliente = new FormGroup({
      'nombre': new FormControl('', [Validators.required]),
      'nit': new FormControl('', [Validators.required])
    });
   }

  ngOnInit() {
    this.itemSer.getAllItems().subscribe((items) => {
      this.listItems = items;
    });

   
  }


  mostrarProductos(){
    this.activarProductos = !this.activarProductos;
  }

  public guardarPedido() {
    if (this.formatoCliente.value.nombre.length > 0 && this.formatoCliente.value.nit.length > 0 && this.listItemsPedido.length > 0){
      this.pedido = new Pedido( this.usuario.getIdUsuario(),
                                this.formatoCliente.value.nit,
                                this.listItemsPedido,
                                this.total,
                                false,
                                false);
      this.pedidoSer.addPedido(this.pedido);
    }
    console.log(this.formatoCliente.value);

  }

  getKeyItem(key){
    this.itemSer.getItem(key).subscribe((item) =>{
        this.itemDetalle = item;
    });
  }

  mandarATabla() {
    this.listItemsPedido.push(this.itemDetalle);
  
    //this.totales.push(this.cantidad * this.itemDetalle.getPrecio());

     this.totales.forEach(num => {
      this.total += num;
    });

      this.closeModal.nativeElement.click();
  }



}
