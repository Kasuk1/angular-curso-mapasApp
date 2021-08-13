import { Component, OnInit } from '@angular/core';
import * as mapboxgl from "mapbox-gl";
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  ngOnInit(): void {
    //Estableciendo Token de manera Global.
    (mapboxgl as any).accessToken = environment.mapBoxToken;
  }
  
  
}
