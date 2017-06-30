import { Component, ElementRef, OnInit, ViewChild, OnChanges, OnDestroy, DoCheck } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import * as jsPDF from 'jspdf';
// models
import { Cliente } from '../../../models/Cliente';
import { Item } from '../../../models/Item';
import { Pedido } from '../../../models/Pedido';
import { Usuario } from '../../../models/Usuario';
import { DespachoItems } from '../../../models/Despacho';
// servicio
import { SaveinstancePedido } from '../../../services/firebase-services/saveInstancePedido.service';
import { ItemService } from '../../../services/firebase-services/item.service';
import { PedidosService } from '../../../services/firebase-services/pedido.service';
import { ClienteService } from '../../../services/firebase-services/cliente.service';
import { Auth } from '../../../services/auth.service';




@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  providers: [ItemService, PedidosService, Auth, ClienteService]
})

export class PedidosComponent implements OnInit, OnChanges, DoCheck {

  @ViewChild('cerrarAgregar') closeModal: ElementRef;
  @ViewChild('cantidadItems') cantidadItems: ElementRef;


  private activarProductos: boolean = false;
  private formatoCliente: FormGroup;
  private listItems: Item[] = [];
  private itemKey: string = "";
  private item: Item = new Item("", 0, 0, "", "", "", false);
  private listDespachoItems: DespachoItems[] = [];
  private pedido: Pedido = new Pedido("", "", 0, this.listDespachoItems, 0, 0, 0, false, false, false);
  private total: number = 0;
  private pedidoSaveInstance: Pedido;
  private nombreItemBuscar: string = "";
  private itemsAux: Item[] = [];
  private pdf: jsPDF = new jsPDF();
  


  constructor(private itemSer: ItemService, private pedidoSer: PedidosService,
    private auth: Auth, private saveIntance: SaveinstancePedido, private clienteSer: ClienteService) {

    this.formatoCliente = new FormGroup({
      'nombre': new FormControl('', [Validators.required]),
      'nit': new FormControl('', [Validators.required])
    });
  }

  ngOnInit() {
    this.itemSer.getAllItems().subscribe((items) => {
      this.listItems = items;
      this.itemsAux = items;
    });

    if (this.saveIntance.getPedido()) {
      this.formatoCliente.value.nit = this.saveIntance.getPedido().nitCliente;
      this.listDespachoItems = this.saveIntance.getPedido().despachoItems;
      this.total = this.saveIntance.getPedido().total;
    }

  }

  ngDoCheck() {
    this.pedidoSaveInstance = new Pedido(
      this.auth.getProfile().user_id,
      this.formatoCliente.value.nombre,
      this.formatoCliente.value.nit,
      this.listDespachoItems,
      this.total,
      0,
      this.total,
      false,
      false,
      false);
    this.saveIntance.saveInstance(this.pedidoSaveInstance, this.formatoCliente.value.nombre);
    console.log("docheck");
   // console.log(this.nombreItemBuscar);

    this.buscarPorNombreItem();
  }

  ngOnChanges() {
    console.log("change");
   // console.log(this.nombreItemBuscar);

  }




  setDetalleKey(itemKey: string) {
    this.itemKey = itemKey;
    this.itemSer.getItem(itemKey).subscribe((item: Item) => {
      this.item = item;
    });
  }

  setEditKey(itemKey: string) {
    this.itemKey = itemKey;
    this.itemSer.getItem(itemKey).subscribe((item: Item) => {
      this.item = item;
    });
  }


  agregarItems(cantidadStr: number) {
    let cantidad: number = Number(cantidadStr);
    let itemAux: Item;

    if (cantidad > 0) {

      this.itemSer.getItem(this.itemKey).subscribe((item) => {
        itemAux = item;
      });

      setTimeout(() => {
        if (itemAux.cantidad >= cantidad) {

          itemAux.cantidad = itemAux.cantidad - cantidad;
          this.itemSer.updateItem(this.itemKey, itemAux, null).then(() => console.log("exito")).catch((error) => console.log(error));

          let existe: boolean = false;
          let num: number = 0;
          for (let i = 0; i < this.listDespachoItems.length; i++) {
            if (this.itemKey == this.listDespachoItems[i].keyItem) {
              existe = true;
              num = i;
            }
          }

          if (existe) {
            this.listDespachoItems[num].item.cantidad += cantidad;
            let despachoAux: DespachoItems = {
              keyItem: this.itemKey,
              item: this.listDespachoItems[num].item
            };
            this.listDespachoItems[num] = despachoAux;

            this.cantidadItems.nativeElement.value = "";
            this.closeModal.nativeElement.click();

          } else {
            itemAux.cantidad = cantidad;

            let despachoAux: DespachoItems = {
              keyItem: this.itemKey,
              item: itemAux
            };

            this.listDespachoItems.push(despachoAux);
            this.cantidadItems.nativeElement.value = "";
            this.closeModal.nativeElement.click();

          }

        } else {
          console.log("no hay cantidad suficiente");
        }

      }, 1000);

    }
    setTimeout(() => {
      this.calcularTotal();
    }, 1500);

  }

  calcularTotal() {
    if (this.listDespachoItems.length > 0) {
      this.total = 0;
      for (let j = 0; j < this.listDespachoItems.length; j++) {
        this.total = this.total + (this.listDespachoItems[j].item.cantidad * this.listDespachoItems[j].item.precio);
      }
    }
  }

  guardarPedido(tipoPedido: string) {

    if(tipoPedido == 'nuevoPedido'){
      this.agregarNuevoPedido();
      this.generarPdfPedido();
    }else {

    }
  }

  generarPdfPedido(){
    console.log("PDFFFFF"+ this.pedido);
    this.pdf.setFontSize(30);
    this.pdf.text(90, 30, "Pedido");
    this.pdf.rect(30,35, 150, 2 );
    this.pdf.setFontSize(20);
    this.pdf.text( 30, 45, `Id usuario ${this.pedido.idUsuario}`);
    this.pdf.text(30, 60, `Nombre cliente: ${ this.pedido.nombreCliente}`);
    this.pdf.text( 30, 75, `Nit cliente: ${ this.pedido.nitCliente}`);

    this.pdf.text(30, 90,"Productos del pedido ");
    this.pdf.text( 45, 105, "Productos: ");
    this.pdf.text( 120, 105, "Cantidad: ");
    
    let distancia: number = 120;
    this.pedido.despachoItems.forEach((item)=>{
    this.pdf.setFontSize(15);
      this.pdf.text(50, distancia,`${item.item.nombre}`);
      this.pdf.text(125, distancia,`${item.item.cantidad}`);
      distancia += 10;
    });

    this.pdf.save(`Pedido_cliente_nit_${this.pedido.nitCliente}.pdf`);

  }

  agregarNuevoPedido(){
    console.log("PDFFFFF nuevo"+ this.pedido);

    this.pedido.idUsuario = this.auth.getProfile().user_id; 
    this.pedido.nombreCliente = this.formatoCliente.value.nombre;
    this.pedido.nitCliente = this.formatoCliente.value.nit;
    this.pedido.despachoItems = this.listDespachoItems;
    this.pedido.total = this.total;
    this.pedido.descuento = 0;
    this.pedido.totalFinal = this.total;
    this.pedido.despachoExitoso = false;
    this.pedido.ventaExitosa = false;
    this.pedido.borrado = false;

    let cliente: Cliente = new Cliente(this.formatoCliente.value.nombre, this.formatoCliente.value.nit);
    this.clienteSer.addCliente(cliente);

    this.pedidoSer.addPedido(this.pedido).then(() => {
      console.log("exito")
      this.formatoCliente.reset();
      this.listDespachoItems = [];
      this.total = 0;
    })
      .catch((error) => console.log(error));
  }


  cancelarPedido() {
    this.formatoCliente.reset();
    if (this.listDespachoItems.length > 0) {
      this.pedidoSer.cancelarPedido(this.listDespachoItems);
      this.listDespachoItems = [];
      this.total = 0;
    }
  }

  eliminarItemTabla(despacho: DespachoItems) {
    let index: number = this.listDespachoItems.indexOf(despacho);
    let cantidad: number = this.listDespachoItems[index].item.cantidad;
    let key: string = this.listDespachoItems[index].keyItem;
    let itemAux: any;
    this.listDespachoItems.splice(index, 1);
    this.itemSer.getItem(key).subscribe((item) => {
      itemAux = item;
    });
    setTimeout(() => {
      itemAux.cantidad += cantidad;
      this.itemSer.updateItem(key, itemAux, null);
    }, 1000);

  }



  buscarPorNombreItem() {

    if (this.nombreItemBuscar.length > 2) {
      this.nombreItemBuscar = this.nombreItemBuscar.toLowerCase();
      let itemsArrayEncontrados: Item[] = [];
      for (let item of this.listItems) {
        let nombreItem: string = item.nombre.toLowerCase();
        if (item.nombre.indexOf(this.nombreItemBuscar) >= 0) {
          itemsArrayEncontrados.push(item);
        }
        if (itemsArrayEncontrados.length > 0) {
          this.listItems = itemsArrayEncontrados;
        } else {
          this.listItems = this.itemsAux;
        }
      }
    } else {

      this.listItems = this.itemsAux;
    }
  }


  //recibirAEditarPedidoDespacho(keyPedido: string){
  //  console.log("keyPedido");
  //  console.log(keyPedido);
  //}


}
