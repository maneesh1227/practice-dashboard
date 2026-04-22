import { Component, inject, OnInit, PLATFORM_ID , ChangeDetectorRef} from '@angular/core';
import { PlxData } from '../../services/plx-data';
import { ChartModule } from 'primeng/chart';
import { isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs';
import { Pie } from '../../models/pie';

@Component({
  selector: 'app-analytics',
  imports: [ChartModule],
  templateUrl: './analytics.html',
  styleUrl: './analytics.css',
})
export class Analytics implements OnInit {

  pieData$: Observable<Pie[]>;

  constructor(private plxDataDI: PlxData){
    this.pieData$ = this.plxDataDI.pieMetrics$;
  }

  data: any;
    options: any;
    platformId = inject(PLATFORM_ID);
    // configService = inject(AppConfigService);
    // designerService = inject(DesignerService);
    private cd = inject(ChangeDetectorRef);

    ngOnInit() {
        this.pieData$.subscribe(metrics => {
        this.initChart(metrics);});
    }

    initChart(metrics: Pie[]) {
        if (isPlatformBrowser(this.platformId)) {
            const documentStyle = getComputedStyle(document.documentElement);
            const textColor = documentStyle.getPropertyValue('--text-color');
        
            this.data = {
                labels: metrics.map(m => m.label),
                datasets: [
                    {
                        data: metrics.map(m => m.value),
                        backgroundColor: [documentStyle.getPropertyValue('--p-cyan-500'), documentStyle.getPropertyValue('--p-orange-500'), documentStyle.getPropertyValue('--p-gray-500')],
                        hoverBackgroundColor: [documentStyle.getPropertyValue('--p-cyan-400'), documentStyle.getPropertyValue('--p-orange-400'), documentStyle.getPropertyValue('--p-gray-400')]
                    }
                ]
            };
        
            this.options = {
                plugins: {
                    legend: {
                        labels: {
                            usePointStyle: true,
                            color: textColor
                        }
                    }
                }
            };
            this.cd.markForCheck();
        }
    }

}
