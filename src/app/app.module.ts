import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
//rutas
import { ROUTES_ROUTING } from './app.routes';

//services
import { Auth } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';
import { SaveinstancePedido } from './services/firebase-services/saveInstancePedido.service';
import { ItemService } from './services/firebase-services/item.service';

//components
import { MenuLateralComponent } from './components/dashboard/menu-lateral/menu-lateral.component';
import { PedidosComponent } from './components/dashboard/pedidos/pedidos.component';
import { DespachosComponent } from './components/dashboard/despachos/despachos.component';
import { ClientesComponent } from './components/dashboard/clientes/clientes.component';
import { ProduccionComponent } from './components/dashboard/produccion/produccion.component';
import { AlmacenesComponent } from './components/dashboard/almacenes/almacenes.component';
import { CobrosComponent } from './components/dashboard/cobros/cobros.component';
import { PreciosComponent } from './components/dashboard/precios/precios.component';

//cards
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MdCardModule} from '@angular/material';

//grid
import {MdGridListModule} from '@angular/material';

//firebase
import { AngularFireModule } from 'angularfire2';
import { environment } from './configuracion/Firebase-config';
import { AngularFireDatabaseModule } from 'angularfire2/database';





@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    AboutComponent,
    DashboardComponent,
    MenuLateralComponent,
    PedidosComponent,
    DespachosComponent,
    ClientesComponent,
    ProduccionComponent,
    AlmacenesComponent,
    CobrosComponent,
    PreciosComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ROUTES_ROUTING,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MdCardModule,
    MdGridListModule,
    AngularFireModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    ReactiveFormsModule
  ],
  providers: [
    Auth,
    AuthGuardService,
    SaveinstancePedido,
    ItemService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
