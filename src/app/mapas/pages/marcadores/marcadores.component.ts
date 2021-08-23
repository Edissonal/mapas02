import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

interface MarcadorColor{
  color: string;
  marker?:mapboxgl.Marker;
  centro?:[number,number]
}

@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styles: [
    `
    .mapa-container {
      height: 100%;
      width: 100%; 
    }

    .list-group {
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 99;
    }
    li {
      cursor: pointer;
    }
    `
  ]
})
export class MarcadoresComponent implements OnInit ,AfterViewInit {

  @ViewChild('mapa2') divMapa!: ElementRef;
  mapa!:mapboxgl.Map;
  zoomlevel:number =10;
  center:[number,number] =[-74.24503019044565, 4.558856806439514];
  marcadores:MarcadorColor[] =[];

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    console.log('fulscreen');
    
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center:this.center,
      zoom : this.zoomlevel
    });

    this.leerlocalStorage();
    const markerHtml:HTMLElement = document.createElement('div');
    markerHtml.innerHTML = 'Holamundo';
 
  /*  new mapboxgl.Marker({
    element:markerHtml
    })
    .setLngLat(this.center)
      .addTo(this.mapa);
   */ 
  }

  irMrcador(marker:mapboxgl.Marker){
    this.mapa.flyTo({
      center:marker.getLngLat()

    });
  }

  agregarMarcador(){
    const color = "#xxxxxx".replace(/x/g, y=>(Math.random()*16|0).toString(16));
    const nuevoMrcador = new mapboxgl.Marker({
      draggable:true,
      color
    })
    .setLngLat( this.center)
    .addTo(this.mapa);
   
    this.marcadores.push({
      color,
      marker: nuevoMrcador
    });
    this.guardarmarcadoresLocalstorage();
    nuevoMrcador.on('dragend',()=>{
      this.guardarmarcadoresLocalstorage();
     })
  }

  guardarmarcadoresLocalstorage(){

      const lngLatArr : MarcadorColor[] =[];

      this.marcadores.forEach(m => {
            const color = m.color;
            const{lng,lat} = m.marker!.getLngLat();
            lngLatArr.push({
              color:color,
              centro:[lng,lat]
            })
            localStorage.setItem('marcadores',JSON.stringify(lngLatArr));
        
      });
  }

  leerlocalStorage(){
    if(!localStorage.getItem('marcadores')){
      return;
    }

    const lngLatArr :MarcadorColor[]  = JSON.parse(localStorage.getItem('marcadores')!)
    lngLatArr.forEach(m => {
      
      const newmarker = new mapboxgl.Marker({
         color:m.color,
         draggable:true
      })
      .setLngLat(m.centro!)
      .addTo(this.mapa);
      this.marcadores.push({
        marker:newmarker,
        color:m.color
      });
      newmarker.on('dragend',()=>{
       this.guardarmarcadoresLocalstorage();
      })

    });
  }

  borrarmarcador(i:number){
    this.marcadores[i].marker?.remove();
    this.marcadores.splice(i,1);

  }
}
