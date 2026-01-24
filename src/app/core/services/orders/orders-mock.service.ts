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
      value: 250.75,
      status: 'PAID',
    },
    {
      id: 2,
      date: new Date('2026-01-12'),
      client: 'João Souza',
      value: 120.00,
      status: 'PENDING',
    },
    {
      id: 3,
      date: new Date('2026-01-15'),
      client: 'Ana Pereira',
      value: 560.40,
      status: 'CANCELED',
    },
    {
      id: 4,
      date: new Date('2026-01-18'),
      client: 'Carlos Mendes',
      value: 89.99,
      status: 'REFUNDED',
    },
    {
      id: 5,
      date: new Date('2026-01-09'),
      client: 'Fernanda Costa',
      value: 310.00,
      status: 'PAID',
    },
    {
      id: 6,
      date: new Date('2026-01-13'),
      client: 'Maria Silva',
      value: 150.00,
      status: 'PENDING',
    },
    {
      id: 7,
      date: new Date('2026-01-02'),
      client: 'Maria Silva',
      value: 420.50,
      status: 'PAID',
    },
    {
      id: 8,
      date: new Date('2026-01-07'),
      client: 'João Souza',
      value: 200.00,
      status: 'PAID',
    },
    {
      id: 9,
      date: new Date('2026-01-20'),
      client: 'João Souza',
      value: 75.25,
      status: 'REFUNDED',
    },
    {
      id: 10,
      date: new Date('2026-01-01'),
      client: 'Ana Pereira',
      value: 330.00,
      status: 'PENDING',
    },
    {
      id: 11,
      date: new Date('2026-01-03'),
      client: 'Ana Pereira',
      value: 610.90,
      status: 'PAID',
    },
  ];

  private ramDelay(min = 600, max = 1200): number {
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