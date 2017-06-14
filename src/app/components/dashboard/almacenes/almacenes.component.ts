import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-almacenes',
  templateUrl: './almacenes.component.html',
  styles: []
})
export class AlmacenesComponent implements OnInit {

  activarAgregarAlmacen:boolean = false;

  constructor() { }

  ngOnInit() {
  }

}
