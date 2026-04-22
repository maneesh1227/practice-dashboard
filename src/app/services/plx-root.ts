import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PlxRecord } from '../models/plx-record';
import { map } from 'rxjs/internal/operators/map';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { combineLatest } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlxRoot {
  constructor(private httpClient: HttpClient){}

  // 1. The "Database" (Large Sample Data)
  private masterData: PlxRecord[] = this.generateLargeData();

  // 2. The Filter States (Initial values)
  private regionFilter$ = new BehaviorSubject<string>('All');
  private categoryFilter$ = new BehaviorSubject<string>('All');

  // 3. The Reactive Filtered Stream
  // This combines the data and filters into one output
  public filteredData$ = combineLatest([
    this.regionFilter$,
    this.categoryFilter$
  ]).pipe(
    map(([region, category]) => {
      return this.masterData.filter(item => 
        (region === 'All' || item.region === region) &&
        (category === 'All' || item.category === category)
      );
    })
  );

  // Methods to update filters
  setRegion(region: string) { this.regionFilter$.next(region); }
  setCategory(category: string) { this.categoryFilter$.next(category); }

  private generateLargeData(): PlxRecord[] {
    const regions = ['East', 'West', 'North', 'South'];
    const categories = ['Mobile', 'Desktop', 'Tablet', 'Wearables'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    const data: PlxRecord[] = [];

    for (let i = 0; i < 200; i++) {
      data.push({
        region: regions[Math.floor(Math.random() * regions.length)],
        category: categories[Math.floor(Math.random() * categories.length)],
        month: months[Math.floor(Math.random() * months.length)],
        value: Math.floor(Math.random() * 5000) + 500
      });
    }
    return data;
  }
}
