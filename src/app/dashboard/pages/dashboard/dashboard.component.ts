import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';

import { AuthService } from '../../../core/services/auth/auth.service';
import { OrdersService } from '../../../core/services/orders/orders.service';
import { ToastService } from '../../../core/services/toast.service';
import { Order } from '../../../core/models/orders/order.model';

interface Kpis {
  revenue: number;
  ordersCount: number;
  avgTicket: number;
}

interface ChartData {
  days: string[];
  revenue: number[];
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
  hasError = false;
  errorMessage = '';

  loadOrders() {
    this.isLoading = true;
    this.hasError = false;
    this.errorMessage = '';

    this.ordersService.getOrders(this.period)
    .pipe(finalize(() => {this.isLoading = false;}))
    .subscribe({
      next: (ordersFromSelectedPeriod) => {
        this.allOrders = ordersFromSelectedPeriod
        this.applyUiFilters()
        this.buildChartData(this.allOrders);
      },
      error: (err) => {
        this.toastService.error(err.message);
        this.hasError = true;
        this.errorMessage = err?.message || 'Não foi possível carregar os dados.';
      },
    });
  }

  // Aplicar todos os filtros para serem exibidos na UI
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

  // Lógica para KPIs
  calculateKpis(ordersFromSelectedPeriod: Order[]) {
    const revenue = ordersFromSelectedPeriod.reduce((acc, order) => acc + order.value, 0);
    const ordersCount = ordersFromSelectedPeriod.length;
    const avgTicket = (ordersCount > 0) ? revenue / ordersCount : 0;

    return { revenue, ordersCount, avgTicket };
  }

  // Lógica para Gráfico
  chartData: ChartData = { days: [], revenue: [] };
  buildChartData(allOrders: Order[]) {
    if (!allOrders.length) return;

    const arrDays: string[] = [];
    const arrRevenue: number[] = []

    const endDate = new Date(2026, 0, 20);
    const periodInMs = (this.period - 1) * 24 * 60 * 60 * 1000;
    const startDate = new Date(endDate.getTime() - periodInMs);

    const currentDay = new Date(startDate)

    for (let i = 0; i < this.period; i++) {
      const labelDay = currentDay.toLocaleDateString('pt-BR')
      arrDays.push(labelDay);

      let value: number = 0

      allOrders.forEach(order => {
        const orderDay = order.date.toLocaleDateString('pt-BR')
        if (labelDay === orderDay) {
          value += order.value
        }
      })

      arrRevenue.push(value) 
      currentDay.setDate(currentDay.getDate() + 1);
    }

    this.chartData = { days: arrDays, revenue:arrRevenue }
  }

  // Lógica para Tabela
  onSearch(searchText: string) {
    this.search = searchText
    this.applyUiFilters();
  }

  onSortToggle() {
    this.sort = this.sort === 'asc' ? 'desc' : 'asc';
    this.applyUiFilters();
  }

  retry() {
    this.loadOrders();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
