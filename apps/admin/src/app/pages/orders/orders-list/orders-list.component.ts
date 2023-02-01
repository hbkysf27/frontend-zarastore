import { Component, OnInit } from '@angular/core';
import { Order, OrdersService } from '@zarafe/orders';

const ORDER_STATUS = {
  0:{
    label:'Pending',
    color: "info"
  },
  1:{
    label:'Processed',
    color: "primary"
  },
  2:{
    label:'Shipped',
    color: "warning"
  },
  3:{
    label:'Delivered',
    color: "success"
  },
  4:{
    label:'Failed',
    color: "danger"
  },
};
@Component({
  selector: 'admin-orders-list',
  templateUrl: './orders-list.component.html',
  styles: [
  ]
})
export class OrdersListComponent implements OnInit {
  orders: Order[] = [];
  orderStatus=ORDER_STATUS;

  constructor(private ordersService: OrdersService){}


  ngOnInit(): void {
    this._getOrders();
  }

  _getOrders(){
    this.ordersService.getOrders().subscribe((orders)=>{
      this.orders = orders;
    });

  }
}
