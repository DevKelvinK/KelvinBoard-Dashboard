import { Injectable } from '@angular/core';
import { delay, dematerialize, materialize, Observable, of, throwError } from 'rxjs';

import { Order } from '../../models/orders/order.model';

@Injectable({
  providedIn: 'root'
})

export class OrdersMockService {
  private ordersData: Order[] = [
    {
      id: 1,
      date: new Date('2026-01-10'),
      client: 'Maria Silva',
      avatar: 'cliente-2',
      value: 250.75,
      status: 'PAID',
    },
    {
      id: 2,
      date: new Date('2026-01-12'),
      client: 'João Souza',
      avatar: 'cliente-1',
      value: 120.00,
      status: 'PENDING',
    },
    {
      id: 3,
      date: new Date('2026-01-15'),
      client: 'Ana Pereira',
      avatar: 'cliente-3',
      value: 560.40,
      status: 'CANCELED',
    },
    {
      id: 4,
      date: new Date('2026-01-18'),
      client: 'Carlos Mendes',
      avatar: 'cliente-4',
      value: 89.99,
      status: 'REFUNDED',
    },
    {
      id: 5,
      date: new Date('2026-01-09'),
      client: 'Fernanda Costa',
      avatar: 'cliente-3',
      value: 310.00,
      status: 'PAID',
    },
    {
      id: 6,
      date: new Date('2026-01-14'),
      client: 'Maria Silva',
      avatar: 'cliente-2',
      value: 150.00,
      status: 'PENDING',
    },
    {
      id: 7,
      date: new Date('2026-01-02'),
      client: 'Maria Silva',
      avatar: 'cliente-2',
      value: 420.50,
      status: 'PAID',
    },
    {
      id: 8,
      date: new Date('2026-01-07'),
      client: 'Carlos Mendes',
      avatar: 'cliente-1',
      value: 200.00,
      status: 'PAID',
    },
    {
      id: 9,
      date: new Date('2026-01-17'),
      client: 'João Souza',
      avatar: 'cliente-1',
      value: 75.25,
      status: 'PAID',
    },
    {
      id: 10,
      date: new Date('2026-01-01'),
      client: 'Ana Pereira',
      avatar: 'cliente-3',
      value: 330.00,
      status: 'PENDING',
    },
    {
      id: 11,
      date: new Date('2026-01-03'),
      client: 'Fernanda Costa',
      avatar: 'cliente-3',
      value: 610.90,
      status: 'PAID',
    },
  ];

  private ramDelay(min = 2000, max = 3000): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private simulateError({ message, field }: { message: string; field?: string }) {
    return throwError(() => ({ field, message })).pipe(
      // Simulação de delay na resposta do erro.
      materialize(),
      delay(this.ramDelay()),
      dematerialize()
    );
  }

  //(getDashboard(period: 7 | 30): Observable<DashboardData>) pedido nas instruções do teste técnico
  getOrders(period: 7 | 30): Observable<Order[]> {
    const dateNow = new Date('2026/01/20')
    
    const periodInMs = period * 24 * 60 * 60 * 1000;
    const startDate = new Date(dateNow.getTime() - periodInMs);

    const filteredOrders = this.ordersData.filter(order => order.date >= startDate && order.date <= dateNow)

    if (this.ordersData.length < 1) {
      return this.simulateError({message: 'Nenhum pedido encontrado nesse período'})
    }

    return of(filteredOrders).pipe(delay(this.ramDelay()))
  }
}