import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapasRoutingModule } from './mapas-routing.module';
import { MinimapaComponent } from './components/minimapa/minimapa.component';
import { FullscreenComponent } from './pages/fullscreen/fullscreen.component';
import { MarcadoresComponent } from './pages/marcadores/marcadores.component';
import { ZoomRageComponent } from './pages/zoom-rage/zoom-rage.component';
import { PropiedadesComponent } from './pages/propiedades/propiedades.component';



@NgModule({
  declarations: [
    MinimapaComponent,
    FullscreenComponent,
    MarcadoresComponent,
    ZoomRageComponent,
    PropiedadesComponent,

  ],
  imports: [
    CommonModule,
    MapasRoutingModule
  ]
})
export class MapasModule { }
