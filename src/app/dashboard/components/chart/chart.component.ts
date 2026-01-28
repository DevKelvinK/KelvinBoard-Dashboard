import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ChartConfiguration, ChartType, plugins } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

interface ChartData {
  days: string[];
  revenue: number[];
}

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [
    CommonModule,
    BaseChartDirective
  ],
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent {
  @Input() chartData!: ChartData;
  @Input() isLoading: boolean = false;

  public lineChartData?: ChartConfiguration<'line'>['data'];
  public lineChartType?: ChartType = 'line';

  lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        padding: 12,
        cornerRadius: 8,
        bodySpacing: 6,
        caretPadding: 8
      }
    }
  }

  ngOnChanges(): void {
    if (!this.chartData) return;

    this.lineChartData = {
      labels: this.chartData.days,
      datasets: [
        {
          data: this.chartData.revenue,
          label: 'Receita',
          borderColor: '#4318FF',
          backgroundColor: '#4318FF',
          borderWidth: 2,
          tension: 0.3,
          fill: false,
          pointRadius: 3,
          pointBackgroundColor: '#4318FF'
        }
      ]
    }
  }
}
