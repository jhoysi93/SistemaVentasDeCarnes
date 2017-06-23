import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { iterateListLike } from '@angular/core/src/change_detection/change_detection_util';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Item } from '../../../models/Item';
import { Almacen } from '../../../models/Almacen';
import { ItemService } from '../../../services/firebase-services/item.service';
import { AlmacenService } from '../../../services/firebase-services/almacen.service';



@Component({
  selector: 'app-produccion',
  templateUrl: './produccion.component.html',
  providers: [ItemService, AlmacenService]
})
export class ProduccionComponent implements OnInit {

  activarFormAgregarItem: boolean = false;
  activarCardsItems: boolean = false;
  private item: Item = new Item("", 0, 0, "", "", "", false);
  private itemAuxiliar: Item = new Item("", 0, 0, "", "", "", false);
  private itemKey: string = "";
  private formatoItem: FormGroup;
  private listAlmacenes: Almacen[];
  private listItems: Item[];

  private btnActualizarItem: boolean = false;
  private btnGuardarItem: boolean = false;

  @ViewChild('cerraModalEliminar') cerraModalEliminar: ElementRef;

  constructor(private itemSer: ItemService, private almacenSer: AlmacenService) {
    this.formatoItem = new FormGroup({
      'nombre': new FormControl('', [Validators.required]),
      'cantidad': new FormControl('', [Validators.required]),
      'detalle': new FormControl('', [Validators.required]),
      'tipoAlmacen': new FormControl('', [Validators.required]),
      'imagen': new FormControl('')
    });
  }

  ngOnInit() {
    this.almacenSer.getAllAlmacen().subscribe((almacenes) => {
      this.listAlmacenes = almacenes;
    });

    this.itemSer.getAllItems().subscribe((items) => {
      this.listItems = items;
    });
  }

  private imagen: File;
  cargaImagen(event: any) {
    let file = event.srcElement.files;
    console.log(file);
    this.imagen = file[0];
  }

  guardarItem() {
    console.log(this.formatoItem.value);
    let datos: any = this.formatoItem.value;
    let itemAux: Item = new Item(datos.nombre, 0, datos.cantidad, datos.detalle, datos.tipoAlmacen,
      "imagen", false);
    this.itemSer.addItem(itemAux, this.imagen);
    setTimeout(() => {
      this.activarFormAgregarItem = false;
      this.formatoItem.reset();
    }, 2000);
  }

  setDetalleKey(keyItem: string) {
    console.log(keyItem);
    this.itemSer.getItem(keyItem).subscribe((item) => {
      this.itemAuxiliar = item;
    });
  }


  setEditKey(keyItem) {
    this.btnActualizarItem = true;
    this.btnGuardarItem = false;
    this.activarFormAgregarItem = true;
    this.itemKey = keyItem;
    this.itemSer.getItem(keyItem).subscribe((item) => {
      this.item = item;
    });
  }

  actualizarItem() {
    console.log("actualizar Item");
    console.log(this.item);
    console.log("actualizar key");
    console.log(this.itemKey);
    if (this.imagen) {
      this.itemSer.updateItem(this.itemKey, this.item, this.imagen);
    } else {
      this.itemSer.updateItem(this.itemKey, this.item, this.imagen);
    }
    setTimeout(() => {
      this.activarFormAgregarItem = false;
    }, 1000);
  }

  setRemoveKey(keyItem) {
    this.itemKey = keyItem;
  }

  eliminarItem() {
    this.itemSer.removeItem(this.itemKey);
    this.cerraModalEliminar.nativeElement.click();
  }

  habilitarDesabilitar() {

    this.btnGuardarItem = true;
    this.btnActualizarItem = false;
    this.activarFormAgregarItem = !this.activarFormAgregarItem;
    this.formatoItem.reset();
  }


}
