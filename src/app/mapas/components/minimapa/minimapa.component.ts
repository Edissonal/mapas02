import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-minimapa',
  templateUrl: './minimapa.component.html',
  styles: [
    `
    div{
      width:100%;
      height:150px;
      margin:0;
    }
    `
  ]
})
export class MinimapaComponent implements OnInit,AfterViewInit {

  @Input() lngLat:[number,number] =[0,0];
  @ViewChild('mapa')  divmapa!: ElementRef; 
  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {   
    var mapa = new mapboxgl.Map({
      container: this.divmapa.nativeElement,
        style: 'mapbox://styles/mapbox/streets-v11',
        center:this.lngLat,
        zoom:17,
        interactive:false
  });

  new mapboxgl.Marker()
    .setLngLat(this.lngLat)  
    .addTo(mapa);
  }


}
