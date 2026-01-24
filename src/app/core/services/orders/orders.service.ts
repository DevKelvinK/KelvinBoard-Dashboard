import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';

import { OrdersMockService } from './orders-mock.service';
import { Order } from '../../models/orders/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(
    private ordersMockService: OrdersMockService
  ) { }

  period: 7 | 30 = 7;
  getOrders(period: 7 | 30): Observable<Order[]> {
    return this.ordersMockService.getOrders(period);
  }
}
