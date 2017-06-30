import { Component, OnInit } from '@angular/core';
import { TransaccionService } from '../../../services/firebase-services/transaccion.service';
import { Transaccion } from '../../../models/Transaccion';
import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  providers: [TransaccionService]
})
export class ClientesComponent implements OnInit {

  private listTransaccionesCliente: Transaccion[] = [];
  private pdf: jsPDF = new jsPDF();

  constructor(private transacSer: TransaccionService) { }

  ngOnInit() {
  }

  buscarPorNit(nitClienteStr: number) {
    let nitCliente: number = Number(nitClienteStr);
    let transaccionesAux: Transaccion[] = [];
    if (nitCliente) {
      this.transacSer.getTransaccionPorNit(nitCliente).subscribe((transacciones) => {
        transaccionesAux = transacciones;
      });
      setTimeout(() => {
        if (transaccionesAux.length > 0) {
          this.listTransaccionesCliente = transaccionesAux;
        } else {
          console.log("no existe en transacciones del cliente")
        }
      }, 1200);
    }
  }

  generarPdfCliente() {
    if (this.listTransaccionesCliente.length > 0) {
      this.listTransaccionesCliente.forEach((transaccion, i) => {



        this.pdf.setFontSize(30);
        this.pdf.text(80, 30, "Transaccion");
        this.pdf.rect(30, 35, 150, 2);
        this.pdf.setFontSize(20);
        this.pdf.text(30, 50, `Id usuario: ${transaccion.idUsuario}`);
        this.pdf.text(30, 65, `Nombre cliente: ${transaccion.nombreCliente}`);
        this.pdf.text(30, 80, `Nit cliente: ${transaccion.nitCliente}`);

        this.pdf.text(30, 95, `Total inicial: ${transaccion.totalAnterior}`);
        this.pdf.text(30, 110, `Porcentaje descuento: ${transaccion.porcentajeDescsuento} %`);
        this.pdf.text(30, 125, `Total final: ${transaccion.totalFinal}`);
        this.pdf.text(30, 140, `Detalle de la compra: ${transaccion.detalle}`);
        this.pdf.text(30, 165, `Fecha de la compra: ${transaccion.date}`);
        
        if(i < this.listTransaccionesCliente.length - 1){

          this.pdf.addPage();
        }


      });

        this.pdf.save(`Transaccion_nit_cliente_${this.listTransaccionesCliente[0].nitCliente }.pdf`);
    }else{
      return;
    }

  }

}
