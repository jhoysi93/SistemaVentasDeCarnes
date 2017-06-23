import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ItemService } from '../../../services/firebase-services/item.service';
import { Item } from '../../../models/Item';

@Component({
  selector: 'app-precios',
  templateUrl: './precios.component.html',
  providers: [ItemService]
})
export class PreciosComponent implements OnInit {

  private listItems: Item[] = [];
  private keyItem: string = "";
  private item: Item = new Item("", 0, 0, "", "", "", false);
  @ViewChild('cerrarEditarPrecio') cerrarEditarPrecio: ElementRef;
  @ViewChild('precio') precio: ElementRef;

  constructor(private itemSer: ItemService) { }

  ngOnInit() {
    this.itemSer.getAllItems().subscribe((item: Item[]) => {
      this.listItems = item;
    });
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
    let precio:number = Number(precioStr);
    if (precio > 0) {

      this.itemSer.getItem(this.keyItem).subscribe((item: Item) => {
        item.precio = precio;
        this.itemSer.updateItem(this.keyItem, item, null);
        setTimeout( ()=>{
          this.cerrarEditarPrecio.nativeElement.click();
          this.precio.nativeElement.value = "";
        }, 1000);
      });
    } else {
      console.log("precio invalido");
      return;

    }
  }





}
