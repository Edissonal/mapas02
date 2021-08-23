import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import * as mapboxgl  from "mapbox-gl";
import { environment } from '../../../../environments/environment';


@Component({
  selector: 'app-zoom-rage',
  templateUrl: './zoom-rage.component.html',
  styles: [
    `
    .mapa-container{
      width:100%;
      height:100%;
    }
    .row{
      background-color:white;
      botton:50px;
      left:50px;
      padding:10px;
      position:fixed;
      z-index:9999;
      border-radius:5px;
      margin-top:40%;
      width:400px;
    }
    `
  ]
})
export class ZoomRageComponent implements AfterViewInit,OnDestroy {

  constructor() {

   }

   ngOnDestroy(){
    this.mapa.off('zoom',()=>{});
    this.mapa.off('zoomend',()=>{});
    this.mapa.off('move',()=>{});
   }

  mapa!:mapboxgl.Map;
  @ViewChild('mapa2') divMapa!: ElementRef;
  zoomlevel:number =10;
  center:[number,number] =[-74.24503019044565, 4.558856806439514];

  ngAfterViewInit(): void {
    console.log('fulscreen');
    
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center:this.center,
      zoom : this.zoomlevel
    });

    this.mapa.on('zoom',(ev)=>{
     const zoomActual = this.mapa.getZoom();
     this.zoomlevel = this.mapa.getZoom();
    });

    this.mapa.on('zoomend',(ev)=>{
     if(this.mapa.getZoom() >18){
       this.mapa.zoomTo(18);
     }


     });

     //movimeito del mapa
     this.mapa.on('move', (event) => {
      const target = event.target;
      const {lng,lat} = target.getCenter();
      this.center = [lng,lat];
  })



  }

  

  zoomOut(){
   
    this.mapa.zoomOut();
    
  }

  zoomIn(){
    this.mapa.zoomIn();
  
  }

  zoomCmabio(valor:string){
   this.mapa.zoomTo(Number(valor));
  }
}
