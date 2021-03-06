import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PedidosService } from '../../../services/firebase-services/pedido.service';
import { TransaccionService } from '../../../services/firebase-services/transaccion.service';
//models
import { Transaccion } from '../../../models/Transaccion';
import { Pedido } from '../../../models/Pedido';
import { DespachoItems } from '../../../models/Despacho';
// pdf
import * as jsPDF from 'jspdf';


@Component({
  selector: 'app-cobros',
  templateUrl: './cobros.component.html',
  providers: [PedidosService, TransaccionService]
})
export class CobrosComponent implements OnInit {

  private listPedidos: Pedido[] = [];
  private keyPedido: string = "";
  private listDespachoItems: DespachoItems[] = [];
  private pedido: Pedido = new Pedido("", "", 0, this.listDespachoItems, 0, 0, 0, false, false, false);
  private pdf: jsPDF = new jsPDF;

  @ViewChild('cerrarDescuentoPrecio') cerrarDescuentoPrecio: ElementRef;
  @ViewChild('cerrarVentaExitosa') cerrarVentaExitosa: ElementRef;

  constructor(private pedidoSer: PedidosService, private transacSer: TransaccionService) { }

  ngOnInit() {
    this.pedidoSer.getAllPedidos().subscribe((pedidos) => {
      this.listPedidos = pedidos;
    });
  }

  setKeyPedido(pedidoKey: string) {
    this.keyPedido = pedidoKey;
    this.pedidoSer.getPedido(pedidoKey).subscribe((pedido) => {
      this.pedido = pedido;
    });
  }

  descontarPrecio(descuentoStr: number) {
    console.log(descuentoStr);
    let descuento: number = Number(descuentoStr);
    let pedidoAux: Pedido;
    if (descuento > 0 && descuento < 90) {
      this.pedidoSer.getPedido(this.keyPedido).subscribe((pedido) => {
        pedidoAux = pedido;
      });

      setTimeout(() => {
        if (pedidoAux) {
          pedidoAux.descuento = descuento;
          pedidoAux.totalFinal = pedidoAux.total - ((pedidoAux.total * descuento) / 100);
          this.pedidoSer.updatePedido(this.keyPedido, pedidoAux).then(() => {
            console.log("descuento exitoso");
            this.cerrarDescuentoPrecio.nativeElement.click();
          }).catch((error) => console.log(error));
        } else {
          console.log("fallo en la conexion de internet");
        }
      }, 1200);
    } else {
      console.log("datos descuento invalido");
      return;
    }

  }

  realizarVentaExitosa(detalle:string) {
    let pedidoAux: any;
    this.pedidoSer.getPedido(this.keyPedido).subscribe((pedido) => {
      pedidoAux = pedido;
    });
    setTimeout(() => {
      if (pedidoAux) {
        pedidoAux.ventaExitosa = true;
        this.pedidoSer.updatePedido(this.keyPedido, pedidoAux).then(()=>{
          let date = new Date();
          let transaccion:Transaccion = new Transaccion(
                                        pedidoAux.$key,
                                        pedidoAux.idUsuario,
                                        pedidoAux.nombreCliente,
                                        pedidoAux.nitCliente,
                                        pedidoAux.total,
                                        pedidoAux.descuento,
                                        pedidoAux.totalFinal,
                                        detalle,
                                        `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`
                                      );
          this.transacSer.addTransaccion(transaccion).then( ()=>{
            console.log("crear transaccion exitosa")
            this.cerrarVentaExitosa.nativeElement.click();
            this.generarPdfCobro(transaccion, pedidoAux);
          })
          .catch((error)=>console.log(error));
        })
        .catch((error)=>console.log(error));

      } else {
        console.log("fallo en la conexion de internet");
      }
    }, 1200);
  }

  generarPdfCobro(transaccion:Transaccion, pedido:Pedido){
    this.pdf.setFontSize(30);
    this.pdf.text(80, 30, "Transaccion");
    this.pdf.rect(30,35, 150, 2 );
    this.pdf.setFontSize(20);
    this.pdf.text( 30, 45, `Id usuario: ${transaccion.idUsuario}`);
    this.pdf.text(30, 55, `Nombre cliente: ${ transaccion.nombreCliente}`);
    this.pdf.text( 30, 65, `Nit cliente: ${ transaccion.nitCliente}`);
    this.pdf.text( 30, 75, `Total inicial: ${ pedido.total}`);
    this.pdf.text( 30, 85, `Porcentaje descuento: ${ transaccion.porcentajeDescsuento} %`);
    this.pdf.text( 30, 95, `Total final: ${ transaccion.totalFinal}`);
    this.pdf.text( 30, 105, `Detalle de la compra: ${ transaccion.detalle}`);
    this.pdf.text( 30, 115, `Fecha de la compra: ${ transaccion.date}`);

    this.pdf.text(30, 125,"Productos del pedido ");

    this.pdf.text( 45, 135, "Productos: ");
    this.pdf.text( 120, 135, "Cantidad: ");
    
    let distancia: number = 140;
    this.pedido.despachoItems.forEach((item)=>{
    this.pdf.setFontSize(15);
      this.pdf.text(50, distancia,`${item.item.nombre}`);
      this.pdf.text(125, distancia,`${item.item.cantidad}`);
      distancia += 7;
    });

    
    this.pdf.save(`Transaccion_nit_cliente_${this.pedido.nitCliente}.pdf`);

  }

}
