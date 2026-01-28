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
      date: new Date(2026, 0,10),
      client: 'Maria Silva',
      avatar: 'cliente-2',
      value: 250.75,
      status: 'PAID',
    },
    {
      id: 2,
      date: new Date(2026, 0,12),
      client: 'João Souza',
      avatar: 'cliente-1',
      value: 120.00,
      status: 'PENDING',
    },
    {
      id: 3,
      date: new Date(2026, 0,15),
      client: 'Ana Pereira',
      avatar: 'cliente-3',
      value: 560.40,
      status: 'CANCELED',
    },
    {
      id: 4,
      date: new Date(2026, 0,18),
      client: 'Carlos Mendes',
      avatar: 'cliente-4',
      value: 89.99,
      status: 'REFUNDED',
    },
    {
      id: 5,
      date: new Date(2026, 0,9),
      client: 'Fernanda Costa',
      avatar: 'cliente-3',
      value: 310.00,
      status: 'PAID',
    },
    {
      id: 6,
      date: new Date(2026, 0,14),
      client: 'Maria Silva',
      avatar: 'cliente-2',
      value: 150.00,
      status: 'PENDING',
    },
    {
      id: 7,
      date: new Date(2026, 0,2),
      client: 'Maria Silva',
      avatar: 'cliente-2',
      value: 420.50,
      status: 'PAID',
    },
    {
      id: 8,
      date: new Date(2026, 0,7),
      client: 'Carlos Mendes',
      avatar: 'cliente-1',
      value: 200.00,
      status: 'PAID',
    },
    {
      id: 9,
      date: new Date(2026, 0,17),
      client: 'João Souza',
      avatar: 'cliente-1',
      value: 75.25,
      status: 'PAID',
    },
    {
      id: 10,
      date: new Date(2026, 0,1),
      client: 'Ana Pereira',
      avatar: 'cliente-3',
      value: 330.00,
      status: 'PENDING',
    },
    {
      id: 11,
      date: new Date(2026, 0,3),
      client: 'Fernanda Costa',
      avatar: 'cliente-3',
      value: 610.90,
      status: 'PAID',
    },
    {
      id: 12,
      date: new Date(2026, 0,15),
      client: 'João Souza',
      avatar: 'cliente-1',
      value: 610.90,
      status: 'PAID',
    },
    {
      id: 13,
      date: new Date(2026, 0,20),
      client: 'Pedro Luiz',
      avatar: 'cliente-4',
      value: 310.90,
      status: 'PENDING',
    },
    {
      id: 14,
      date: new Date(2025, 11,22),
      client: 'João Paulo',
      avatar: 'cliente-1',
      value: 110.90,
      status: 'CANCELED',
    },
    {
      id: 15,
      date: new Date(2025, 11,26),
      client: 'João Paulo',
      avatar: 'cliente-1',
      value: 200.90,
      status: 'PENDING',
    },
    {
      id: 16,
      date: new Date(2025, 11,31),
      client: 'Sofia Kurth',
      avatar: 'cliente-2',
      value: 400,
      status: 'PAID',
    },
    {
      id: 17,
      date: new Date(2025, 11,31),
      client: 'Pedro Luiz',
      avatar: 'cliente-4',
      value: 320.7,
      status: 'CANCELED',
    },
    {
      id: 18,
      date: new Date(2025, 11,31),
      client: 'Maria Silva',
      avatar: 'cliente-2',
      value: 70.9,
      status: 'REFUNDED',
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
    const dateNow = new Date(2026, 0,20);
    
    const periodInMs = (period - 1) * 24 * 60 * 60 * 1000;
    const startDate = new Date(dateNow.getTime() - periodInMs);

    const filteredOrders = this.ordersData.filter(order => order.date >= startDate && order.date <= dateNow)

    // Simulação de erro que poderia vir do back-end
    if (Math.random() < 0.15) {
      return this.simulateError({ message: 'Não foi possível carregar os pedidos. Tente novamente.' });
    }

    return of(filteredOrders).pipe(delay(this.ramDelay()))
  }
}