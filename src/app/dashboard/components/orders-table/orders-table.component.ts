import { Component, EventEmitter, input, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BaseInputComponent } from '../../../shared/components/base-input/base-input.component';
import { Order } from '../../../core/models/orders/order.model';
import { ORDER_STATUS_LABEL } from '../../../shared/constants/order-status-label';

@Component({
  selector: 'app-orders-table',
  standalone: true,
  imports: [BaseInputComponent, CommonModule],
  templateUrl: './orders-table.component.html',
  styleUrl: './orders-table.component.css'
})
export class OrdersTableComponent {
  ORDER_STATUS_LABEL = ORDER_STATUS_LABEL 

  // array de skeleton fake para usar no loading da tabela
  skeletonRows = Array.from({ length: 3 });

  @Input() orders: Order[] = [];
  @Input() period: 7 | 30 = 7
  @Input() isLoading: boolean = false

  @Output() search = new EventEmitter<string>();
  @Output() sort = new EventEmitter<void>();

  onSortClick() {
    this.sort.emit();
  }
}
