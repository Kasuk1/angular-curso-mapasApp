import { Component } from '@angular/core';

interface MenuItem {
  ruta: string;
  nombre: string;
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styles: [
    `
      li {
        cursor: pointer;
      }
    `
  ]
})
export class MenuComponent {

  public menuItems: MenuItem[] = [
    {
      ruta: "mapas/fullscreen",
      nombre: "FullScreen"
    },
    {
      ruta: "mapas/zoom-range",
      nombre: "ZoomRange"
    },
    {
      ruta: "mapas/marcadores",
      nombre: "Marcadores"
    },
    {
      ruta: "mapas/propiedades",
      nombre: "Propiedades"
    },
  ]

}
