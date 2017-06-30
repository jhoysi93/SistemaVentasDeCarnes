import { Component, OnInit, ViewChild, ElementRef, DoCheck } from '@angular/core';
//Services
import { ItemService } from '../../../services/firebase-services/item.service';
import { PrecioService } from '../../../services/firebase-services/precio.service';
//models
import { Item } from '../../../models/Item';
import { Precio } from '../../../models/Precio';

@Component({
  selector: 'app-precios',
  templateUrl: './precios.component.html',
  providers: [ItemService, PrecioService]
})
export class PreciosComponent implements OnInit, DoCheck {

  private listItems: Item[] = [];
  private keyItem: string = "";
  private item: Item = new Item("", 0, 0, "", "", "", false);
  private nombreItemBuscar: string = "";
  private itemsAux:Item[] = []; 

  @ViewChild('cerrarEditarPrecio') cerrarEditarPrecio: ElementRef;
  @ViewChild('precio') precio: ElementRef;

  constructor(private itemSer: ItemService, private precioSer: PrecioService) { }

  ngOnInit() {
    this.itemSer.getAllItems().subscribe((item: Item[]) => {
      this.listItems = item;
            this.itemsAux = item;

    });
  }

  ngDoCheck(){
     this.buscarPorNombreItem();
  }

  setDetalleKey(itemKey) {
    this.itemSer.getItem(itemKey).subscribe((item: Item) => {
      this.item = item;
    });
  }

  setEditKey(itemKey) {
    this.keyItem = itemKey;
    this.itemSer.getItem(itemKey).subscribe((item: Item) => {
      this.item = item;
    });
  }

  editarPrecio(precioStr: number) {
    let precio: number = Number(precioStr);
    let itemAux: Item;
    if (precio > 0) {

      this.itemSer.getItem(this.keyItem).subscribe((item: Item) => {
        itemAux = item;
        this.cerrarEditarPrecio.nativeElement.click();
        this.precio.nativeElement.value = "";

      });
      setTimeout(() => {

        let precioAnterior: number = itemAux.precio;
        itemAux.precio = precio;
        this.itemSer.updateItem(this.keyItem, itemAux, null);
        let date = new Date()
        let dateStr: string = `${date.getDate()} - ${date.getMonth() + 1} - ${date.getFullYear()}`
        let precioRegistro = new Precio(this.keyItem, precioAnterior, precio, dateStr);
        this.precioSer.addPrecio(precioRegistro).then(() => console.log("precio agregado")).catch((error) => console.log(error));

      }, 1000);
    } else {
      console.log("precio invalido");
      return;

    }
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



}
