import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration, ChartTypeRegistry } from 'chart.js';

@Component({
  selector: 'app-chart-display',
  templateUrl: './chart-display.component.html',
  styleUrls: ['./chart-display.component.css'],
  standalone: true,
  imports: [CommonModule, NgChartsModule],
})
export class ChartDisplayComponent implements OnChanges {
  @Input() status: { [key: string]: any } | null = null;

  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [],
        label: 'Sales',
        fill: true,
        tension: 0.4,
        borderColor: 'blue',
        backgroundColor: 'rgba(66, 165, 245, 0.2)',
      },
    ],
    labels: [],
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
    },
  };

  public chartType: keyof ChartTypeRegistry = 'line';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['status'] && this.status) {
      const salesData = this.getSafeNumberArray(this.status['salesData']);
      const timestamps = this.getSafeStringArray(this.status['timestamps']);

      if (salesData.length > 0 && timestamps.length > 0) {
        this.updateChartData(salesData, timestamps);
      } else {
        console.warn('Invalid or empty salesData/timestamps received:', {
          salesData,
          timestamps,
        });
      }
    }
  }

  /**
   * Safely extracts and validates an array of numbers.
   * @param value The input value to validate
   * @returns A valid array of numbers or an empty array
   */
  private getSafeNumberArray(value: unknown): number[] {
    if (Array.isArray(value)) {
      return value.filter((item) => typeof item === 'number') as number[];
    }
    return [];
  }

  /**
   * Safely extracts and validates an array of strings.
   * @param value The input value to validate
   * @returns A valid array of strings or an empty array
   */
  private getSafeStringArray(value: unknown): string[] {
    if (Array.isArray(value)) {
      return value.filter((item) => typeof item === 'string') as string[];
    }
    return [];
  }

  /**
   * Updates the chart data with validated sales and timestamps.
   * @param salesData Array of sales data
   * @param timestamps Array of corresponding timestamps
   */
  private updateChartData(salesData: number[], timestamps: string[]): void {
    this.lineChartData = {
      datasets: [
        {
          ...this.lineChartData.datasets[0],
          data: salesData,
        },
      ],
      labels: timestamps,
    };
    console.log('Chart updated with data:', this.lineChartData);
  }
}
