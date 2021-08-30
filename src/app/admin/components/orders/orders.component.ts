import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  orders = [
    {
      id: '1',
      orderNumber: '12345',
      date: '18-05-2020',
      total: 1000,
    },
    {
      id: '2',
      orderNumber: '23451',
      date: '19-05-2020',
      total: 2000,
    },
    {
      id: '3',
      orderNumber: '34512',
      date: '20-05-2020',
      total: 3000,
    },
    {
      id: '4',
      orderNumber: '45123',
      date: '21-05-2020',
      total: 4000,
    },
    {
      id: '5',
      orderNumber: '51234',
      date: '22-05-2020',
      total: 5000,
    }
  ];

  displayedColumns: string[] = ['orderNumber', 'date', 'total'];

  constructor() { }

  ngOnInit(): void {
  }

  fetchOrders() {
    
  }



}
