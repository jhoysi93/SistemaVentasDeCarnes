import { Component, ElementRef, OnInit, ViewChild, OnChanges, OnDestroy, DoCheck } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Cliente } from '../../../models/Cliente';
import { Item } from '../../../models/Item';
import { Pedido } from '../../../models/Pedido';
import { Usuario } from '../../../models/Usuario';
import { DespachoItems } from '../../../models/Despacho';
import { SaveinstancePedido } from '../../../services/firebase-services/saveInstancePedido.service';
import { ItemService } from '../../../services/firebase-services/item.service';
import { PedidosService } from '../../../services/firebase-services/pedido.service';
import { Auth } from '../../../services/auth.service';




@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  providers: [ItemService, PedidosService, Auth]
})
export class PedidosComponent implements OnInit, OnChanges, DoCheck {

  @ViewChild('cerrarAgregar') closeModal: ElementRef;
  @ViewChild('cantidadItems') cantidadItems: ElementRef;

  private activarProductos: boolean = false;
  private formatoCliente: FormGroup;
  private listItems: Item[] = [];
  private itemKey:string = "";
  private item:Item = new Item("", 0, 0, "", "", "", false);
  private listDespachoItems: DespachoItems[] = [];
  private pedido:Pedido = new Pedido("", "", this.listDespachoItems, 0, false, false);
  private total:number = 0;
  private pedidoSaveInstance:Pedido;


  constructor(private itemSer: ItemService, private pedidoSer: PedidosService,  
  private auth: Auth, private  saveIntance:SaveinstancePedido) {

    this.formatoCliente = new FormGroup({
      'nombre': new FormControl('', [Validators.required]),
      'nit': new FormControl('', [Validators.required])
    });
  }

  ngOnInit() {
    this.itemSer.getAllItems().subscribe(( items ) => {
      this.listItems = items;
    });

    if(this.saveIntance.getPedido()){
      this.formatoCliente.value.nit = this.saveIntance.getPedido().nitCliente;
      this.listDespachoItems = this.saveIntance.getPedido().despachoItems;
      this.total = this.saveIntance.getPedido().total;
    }
  }

  ngDoCheck(){
    this.pedidoSaveInstance = new Pedido(
                          this.auth.getProfile().user_id,
                          this.formatoCliente.value.nit,
                          this.listDespachoItems,
                          this.total,
                          false,
                          false)
    this.saveIntance.saveInstance(this.pedidoSaveInstance);
  }

  ngOnChanges(){
    console.log("change");
  }




   setDetalleKey(itemKey: string) {
    this.itemKey = itemKey;
    this.itemSer.getItem(itemKey).subscribe( ( item:Item ) => {
       this.item = item;
    });
   }

  setEditKey(itemKey: string) {
    this.itemKey = itemKey;
     this.itemSer.getItem(itemKey).subscribe( ( item:Item ) => {
       this.item = item;
    });
   }

  
  agregarItems(cantidadStr:number){
    let cantidad:number = Number(cantidadStr);
    let itemAux:Item;

    if( cantidad > 0 ){

       this.itemSer.getItem(this.itemKey).subscribe( (item) => {
        itemAux = item;
      });

      setTimeout(()=>{
        if(itemAux.cantidad >= cantidad){

          itemAux.cantidad = itemAux.cantidad - cantidad;
          this.itemSer.updateItem(this.itemKey, itemAux, null).then( ()=>console.log("exito")).catch((error)=>console.log(error));

          let existe:boolean = false;
          let num: number = 0;
          for(let i = 0; i < this.listDespachoItems.length; i++){
            if(this.itemKey == this.listDespachoItems[i].keyItem){
              existe = true;
              num = i;
            }
          }

          if( existe ){
            this.listDespachoItems[num].item.cantidad += cantidad;
            let despachoAux:DespachoItems = {
              keyItem: this.itemKey,
              item : this.listDespachoItems[num].item
            };
            this.listDespachoItems[num] = despachoAux;

            this.cantidadItems.nativeElement.value = "";
            this.closeModal.nativeElement.click();

          }else{
            itemAux.cantidad = cantidad;

            let despachoAux:DespachoItems = {
              keyItem: this.itemKey,
              item : itemAux
            };

            this.listDespachoItems.push(despachoAux);
            this.cantidadItems.nativeElement.value = "";
            this.closeModal.nativeElement.click();

          }

        }else{
          console.log("no hay cantidad suficiente");
        }

      }, 1000);

    }
    setTimeout( ()=> {
      this.calcularTotal();
    }, 1500);

  }

  calcularTotal(){
    if(this.listDespachoItems.length > 0){
      this.total = 0;
      for(let j = 0; j < this.listDespachoItems.length ; j++){
        this.total = this.total + ( this.listDespachoItems[j].item.cantidad * this.listDespachoItems[j].item.precio );
      }
    }
  }

  guardarPedido(){

    this.pedido.idUsuario = this.auth.getProfile().user_id;
    this.pedido.nitCliente = this.formatoCliente.value.nit;
    this.pedido.despachoItems = this.listDespachoItems;
    this.pedido.total = this.total;
    this.pedido.exitoso = false;
    this.pedido.borrado = false;

    this.pedidoSer.addPedido(this.pedido).then(()=>console.log("exito")).catch((error) => console.log(error));
  }

 



}
