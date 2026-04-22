import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import { CardModule } from 'primeng/card';
import { PlxRoot } from '../../services/plx-root';
import { SelectModule } from 'primeng/select';
import { PlxRecord } from '../../models/plx-record';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-v-bar',
  imports: [CommonModule, ChartModule, SelectModule, CardModule, FormsModule],
  templateUrl: './v-bar.html',
  styleUrl: './v-bar.css',
})
export class VBar implements OnInit {

  // constructor(private plxRootDI: PlxRoot){}

  private plxService = inject(PlxRoot);
  
  chartData: any;
  chartOptions: any;

  regions = [{label: 'All Regions', value: 'All'}, {label: 'North', value: 'North'}, {label: 'South', value: 'South'}, {label: 'East', value: 'East'}, {label: 'West', value: 'West'}];
  categories = [{label: 'All Categories', value: 'All'}, {label: 'Mobile', value: 'Mobile'}, {label: 'Desktop', value: 'Desktop'}];

  ngOnInit() {
    // Listen to the filtered stream
    this.plxService.filteredData$.subscribe(data => {
      this.prepareChartData(data);
    });

    this.chartOptions = {
      indexAxis: 'x', // This makes it a VERTICAL Bar chart
      plugins: { legend: { position: 'bottom' } },
      scales: { x: { beginAtZero: true } }
    };
  }

  prepareChartData(records: PlxRecord[]) {
    // Aggregate data by Category for the chart
    const labels = [...new Set(records.map(r => r.category))];
    const values = labels.map(label => {
      return records.filter(r => r.category === label)
                    .reduce((sum, current) => sum + current.value, 0);
    });
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    this.chartData = {
      labels: labels,
      datasets: [{
        label: 'Revenue by Category',
                          backgroundColor: [documentStyle.getPropertyValue('--p-cyan-500'), documentStyle.getPropertyValue('--p-orange-500'), documentStyle.getPropertyValue('--p-gray-500')],
        data: values
      }]
    };
  }

  onRegionChange(e: any) { this.plxService.setRegion(e.value); }
  onCategoryChange(e: any) { this.plxService.setCategory(e.value); }
}