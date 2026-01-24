import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-kpi-card',
  standalone: true,
  imports: [],
  templateUrl: './kpi-card.component.html',
  styleUrl: './kpi-card.component.css'
})
export class KpiCardComponent {
  @Input() cardTitle: string = '';
  @Input() cardValue: string = '';
  @Input() iconClass: string = '';
  @Input() isLoading: boolean = false;
}
