import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  myOpts = {
    separator: '.',
    decimal:','
  };

  myOpts_decimal = {
    decimalPlaces: 2,
    separator: '',
    decimal:','
  };

  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Total $ de Ventas del mes', count: 7580.78, opciones: this.myOpts_decimal, cols: 1, rows: 1 },
          { title: 'Ventas concretadas', count: 1500, opciones: this.myOpts, cols: 1, rows: 1 },
          { title: 'Devoluc.', count: 5, opciones: this.myOpts, cols: 1, rows: 1 },
          { title: 'Usuarios Registrados', count: 10561, opciones: this.myOpts, cols: 1, rows: 1 }
        ];
      }

      return [
        { title: 'Total en $ de Ventas del mes', count: 7580.78, opciones: this.myOpts_decimal, cols: 2, rows: 1 },
        { title: 'Ventas concretadas', count: 1500, opciones: this.myOpts, cols: 1, rows: 1 },
        { title: 'Devoluciones', count: 5, opciones: this.myOpts, cols: 1, rows: 2 },
        { title: 'Usuarios Registrados', count: 10561, opciones: this.myOpts, cols: 1, rows: 1 }
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver) {}
}
