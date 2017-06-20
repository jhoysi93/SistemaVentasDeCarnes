import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Item } from '../../../models/Item';


@Component({
  selector: 'app-produccion',
  templateUrl: './produccion.component.html',
  styles: []
})
export class ProduccionComponent implements OnInit {

  activarFormAgregarItem: boolean = false;
  activarCardsItems: boolean = false;
  private item:Item = new Item("", 0, 0, "", "", "", false);
  private formatoItem: FormGroup;

  constructor() {
    this.formatoItem = new FormGroup({
      'nombre': new FormControl('', [Validators.required]),
      'cantidad': new FormControl('', [Validators.required]),
      'detalle': new FormControl('', [Validators.required]),
      'tipoAlmacen': new FormControl('', [Validators.required]),
      'imagen': new FormControl('', [Validators.required])
    });
   }

  ngOnInit() {
  }

}
