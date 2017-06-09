import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
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

//components
import { MenuLateralComponent } from './components/dashboard/menu-lateral/menu-lateral.component';
import { PedidosComponent } from './components/dashboard/pedidos/pedidos.component';
import { DespachosComponent } from './components/dashboard/despachos/despachos.component';
import { ClientesComponent } from './components/dashboard/clientes/clientes.component';
import { ProduccionComponent } from './components/dashboard/produccion/produccion.component';
import { AlmacenesComponent } from './components/dashboard/almacenes/almacenes.component';
import { CobrosComponent } from './components/dashboard/cobros/cobros.component';
import { PreciosComponent } from './components/dashboard/precios/precios.component';


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
    ROUTES_ROUTING
  ],
  providers: [
    Auth,
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
