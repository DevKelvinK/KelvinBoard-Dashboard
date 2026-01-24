import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../../core/services/auth/auth.service';
import { OrdersService } from '../../../core/services/orders/orders.service';
import { ToastService } from '../../../core/services/toast.service';
import { Order } from '../../../core/models/orders/order.model';
import { finalize } from 'rxjs';

interface Kpis {
  revenue: number;
  ordersCount: number;
  avgTicket: number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  constructor(
    private router: Router,
    private authService: AuthService,
    private ordersService: OrdersService,
    private toastService: ToastService,
  ) {}

  ngOnInit() {
    this.applyFilters();
  }

  // Abrir e fechar o sidebar
  isMenuOpen: boolean = false;
  closeMenu() {
    this.isMenuOpen = false;
  }

  calculateKpis(orders: Order[]) {
    const revenue = orders.reduce((acc, order) => acc + order.value, 0);
    const ordersCount = orders.length;
    const avgTicket = revenue / ordersCount;

    return { revenue, ordersCount, avgTicket };
  }

  // Atualizar os dados do dashboard com base no período selecionado
  period: 7 | 30 = 7;
  orders: Order[] = [];
  kpis: Kpis = { revenue: 0, ordersCount: 0, avgTicket: 0 };
  isLoading = false;
  applyFilters() {
    this.isLoading = true;

    this.ordersService.getOrders(this.period)
    .pipe(finalize(() => {this.isLoading = false;}))
    .subscribe({
      next: (filteredOrders) => {
        this.orders = filteredOrders;
        this.kpis = this.calculateKpis(filteredOrders);
      },
      error: (err) => {
        this.toastService.error(err.message);
      },
    });
  }

  PeriodChange(period: 7 | 30) {
    this.period = period;

    this.applyFilters();
  }

  // Fazer testes
  test() {
    this.ordersService.getOrders(this.period).subscribe({
      next: (orders) => {
        this.orders;
        this.toastService.success(`Tem: ${orders.length} pedidos.`);
      },
      error: (err) => {},
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
