import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import * as mapboxgl from "mapbox-gl";

interface MarcadorColor {
  color: string;
  marker?: mapboxgl.Marker;
  centro?: [number, number];
}

@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styles: [
    `
    .mapa-container {
      width: 100%;
      height: 100%;
    }

    .list-group {
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 888;
    }

    li {
      cursor: pointer;
    }
  `
  ]
})
export class MarcadoresComponent implements AfterViewInit {

  @ViewChild("mapa") divMapa!: ElementRef;
  public mapa!: mapboxgl.Map;
  public zoomLevel: number = 15;
  public center: [number, number] = [ -79.83259242071475, -6.778301175970444 ];

  //Arreglo de marcadores
  public marcadores: MarcadorColor[] = [];

  constructor() { }

  ngAfterViewInit(): void {
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: this.zoomLevel
    });

    this.leerLocalStorage();
  }


  agregarMarcador() {
    const color = "#xxxxxx".replace(/x/g, y=>(Math.random()*16|0).toString(16));

    const nuevoMarcador = new mapboxgl.Marker({
      draggable: true,
      color: color
    })
      .setLngLat(this.center)
      .addTo(this.mapa);

      this.marcadores.push({
        color,
        marker: nuevoMarcador
      });

    this.guardarMarcadoresLocalStorage();

    nuevoMarcador.on("dragend", () => {
      this.guardarMarcadoresLocalStorage();
    });
  }


  irMarcador(marker: mapboxgl.Marker) {
    const currentLngLat = marker.getLngLat();
    this.mapa.flyTo({
      center: currentLngLat
    });
  }
  

  guardarMarcadoresLocalStorage() {
    const lngLatArr: MarcadorColor[] = [];

    this.marcadores.forEach(m => {
      const color = m.color;
      const { lng, lat } = m.marker!.getLngLat();

      lngLatArr.push({
        color: color,
        centro: [lng, lat]
      });
    });

    localStorage.setItem("marcadores", JSON.stringify(lngLatArr));
  }


  leerLocalStorage() {
    if(!localStorage.getItem("marcadores")) {
      return;
    }

    const lngLatArr: MarcadorColor[] = JSON.parse( localStorage.getItem("marcadores")! );

    lngLatArr.forEach(m => {
      const newMarker = new mapboxgl.Marker({
        color: m.color,
        draggable: true
      })
        .setLngLat(m.centro!)
        .addTo(this.mapa);

      this.marcadores.push({
        marker: newMarker,
        color: m.color
      });

      newMarker.on("dragend", () => {
        this.guardarMarcadoresLocalStorage();
      });

    });
  }


  borrarMarcador(i: number) {
    this.marcadores[i].marker?.remove();
    this.marcadores.splice(i, 1);
    this.guardarMarcadoresLocalStorage();
  }

}
