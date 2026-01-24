import { Component, EventEmitter, Input, Output } from '@angular/core';

import { BaseInputComponent } from '../../../shared/components/base-input/base-input.component';
import { Order } from '../../../core/models/orders/order.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-orders-table',
  standalone: true,
  imports: [BaseInputComponent, CommonModule],
  templateUrl: './orders-table.component.html',
  styleUrl: './orders-table.component.css'
})
export class OrdersTableComponent {
  @Input() orders: Order[] = [];
  @Input() period: 7 | 30 = 7

  @Output() search = new EventEmitter<string>();
}
