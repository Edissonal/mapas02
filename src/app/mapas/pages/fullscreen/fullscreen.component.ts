import { Component, OnInit } from '@angular/core';
import * as mapboxgl  from "mapbox-gl";
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-fullscreen',
  templateUrl: './fullscreen.component.html',
  styles: [
    `
    #mapa{
      width:100%;
      height:100%;
    }
    `
  ]
})
export class FullscreenComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log('fulscreen');
    
    var map = new mapboxgl.Map({
    container: 'mapa',
      style: 'mapbox://styles/mapbox/streets-v11',
      center:[-74.24503019044565,4.558856806439514],
      zoom:17
});
  }

}
