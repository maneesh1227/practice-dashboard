import { Component, OnInit } from '@angular/core';
import { MultiDataService } from '../../services/multi-data-service';
import {  TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import {  ButtonModule } from 'primeng/button';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-multi-data',
  imports: [TableModule, CommonModule, ButtonModule],
  templateUrl: './multi-data.html',
  styleUrl: './multi-data.css',
})
export class MultiData implements OnInit {
  
  data: any[] = [];
  loading$: Observable<boolean>;

  constructor(private multiDataServiceDI: MultiDataService) {
    this.loading$ = this.multiDataServiceDI.loading$;
  }
  ngOnInit(): void {
    this.multiDataServiceDI.getRealTimeUpdates().subscribe(res => {
      console.log('Real-Time Data:', res);
      this.data = res;
    });
    this.loadData({ first: 0, rows: 10 }); // Load initial data
  }

  // totalRecords: number = 1000000; // Example: 1 Million
  currentPage: number = 1;     // Tracks which page we are currently on
  isLastPage: boolean = false;
  loadData(event: any) {
        // event.first = index of the first row (e.g., 0, 10, 20)
        // event.rows = number of rows per page (e.g., 10)


        // const page = (event.first / event.rows) + 1;
        
        // this.multiDataServiceDI.getMockData(page, event.rows).subscribe(res => {
        //     this.data = res;
        // });

        this.currentPage++;
  this.multiDataServiceDI.getMockData(this.currentPage, 10).subscribe(newData => {
    // Append new data to the existing list
    this.data = [...this.data, ...newData]; 
    
    // If newData.length < 10, hide the "Load More" button (End of data)
    if(newData.length < 10) {
      this.isLastPage = true;
    }
  });
 }

}
