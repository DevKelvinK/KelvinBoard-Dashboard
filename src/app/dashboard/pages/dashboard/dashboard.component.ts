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
  
  // Abrir e fechar o sidebar
  isMenuOpen: boolean = false;
  closeMenu() {
    this.isMenuOpen = false;
  }

  ngOnInit() {
    this.loadOrders();
  }

  PeriodChange(period: 7 | 30) {
    this.period = period;

    this.loadOrders();
  }

  // Atualizar os dados do dashboard com base no período selecionado
  period: 7 | 30 = 7;
  allOrders: Order[] = [];
  isLoading:boolean = false;

  loadOrders() {
    this.isLoading = true;

    this.ordersService.getOrders(this.period)
    .pipe(finalize(() => {this.isLoading = false;}))
    .subscribe({
      next: (ordersFromSelectedPeriod) => {
        this.allOrders = ordersFromSelectedPeriod
        this.applyUiFilters()
      },
      error: (err) => {
        this.toastService.error(err.message);
      },
    });
  }

  search: string = ''
  sort: 'asc' | 'desc' | null = null;
  filteredOrders: Order[] = [];
  kpis: Kpis = { revenue: 0, ordersCount: 0, avgTicket: 0 };

  applyUiFilters() {
    let filtered = [...this.allOrders]

    if (this.search) {
      filtered = filtered.filter(order => order.client.toLocaleLowerCase().includes(this.search.toLocaleLowerCase()))
    }

    if (this.sort) {
      filtered.sort((a, b) =>
        (this.sort === 'asc') 
          ? a.value - b.value
          : b.value - a.value    
      )
    }

    this.filteredOrders = filtered
    this.kpis = this.calculateKpis(filtered);
  }

  calculateKpis(ordersFromSelectedPeriod: Order[]) {
    const revenue = ordersFromSelectedPeriod.reduce((acc, order) => acc + order.value, 0);
    const ordersCount = ordersFromSelectedPeriod.length;
    const avgTicket = revenue / ordersCount;

    return { revenue, ordersCount, avgTicket };
  }

  onSearch(searchText: string) {
    this.search = searchText
    this.applyUiFilters();
  }

  onSortToggle() {
    this.sort = this.sort === 'asc' ? 'desc' : 'asc';
    this.applyUiFilters();
  }

  // Fazer testes
  test() {
    this.ordersService.getOrders(this.period).subscribe({
      next: (orders) => {
        this.allOrders;
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
