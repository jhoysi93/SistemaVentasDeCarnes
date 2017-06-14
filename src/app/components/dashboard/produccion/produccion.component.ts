import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-produccion',
  templateUrl: './produccion.component.html',
  styles: []
})
export class ProduccionComponent implements OnInit {

  activarFormAgregarItem: boolean = false;
  activarCardsItems: boolean = false;
  constructor() { }

  ngOnInit() {
  }

}
