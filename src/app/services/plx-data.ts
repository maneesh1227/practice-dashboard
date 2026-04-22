import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Plx } from '../models/plx';
import { Pie } from '../models/pie';

@Injectable({
  providedIn: 'root',
})
export class PlxData {
  constructor(private httpClient: HttpClient) {}

  private plxData$ = new BehaviorSubject<Plx[]>([{ id: 1, category: 'Revenue', value: 50000, status: 'up', lastUpdated: '2026-04-14' },
    { id: 1, category: 'User Traffic', value: 8500, status: 'up', lastUpdated: '2024-04-14' },
      { id: 2, category: 'Revenue', value: 12400, status: 'stable', lastUpdated: '2024-04-14' },
      { id: 3, category: 'Errors', value: 12, status: 'down', lastUpdated: '2024-04-14' },
  ]);
  plxMetrics$ = this.plxData$.asObservable();

  updatePlxData(newData: Plx[]) {
    this.plxData$.next(newData)
  }


  private pieData$ = new BehaviorSubject<Pie[]>([{ label: 'Chrome', value: 540 },
    { label: 'Safari', value: 325 },
    { label: 'Firefox', value: 702 }])

  public pieMetrics$ = this.pieData$.asObservable();

  updatePieData(newData: Pie[]){
    this.pieData$.next(newData);
  }
}
