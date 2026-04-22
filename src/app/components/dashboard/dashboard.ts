import { Component, OnInit } from '@angular/core';
import { PlxData } from '../../services/plx-data';
import { Plx } from '../../models/plx';
import { CommonModule } from '@angular/common';
import { Tab } from 'primeng/tabs';
import { TableModule } from 'primeng/table';
import { Observable } from 'rxjs/internal/Observable';
import { CardModule } from 'primeng/card';
import { Button, ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, TableModule,CardModule, ButtonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {

  // constructor(private plxDataDI: PlxData){}
   pdata: Plx[] = []

  // ngOnInit() {
  //   this.plxDataDI.plxMetrics$.subscribe(data =>{
  //     this.pdata = data;  
  //   })
  // }

  plxData$: Observable<Plx[]>;

  constructor(private plxDataDI: PlxData, private router: Router) {
    this.plxData$ = this.plxDataDI.plxMetrics$;
  }

  ngOnInit() {
    // You are subscribing here, which is fine, 
    // but your template is using the 'async' pipe on 'plxData$'.
    // In corporate projects, we prefer using the async pipe to avoid memory leaks.
    this.plxData$.subscribe(data => {
      this.pdata = data as Plx[]; // Type casting if names are slightly different
    });
  }

  onClickCheck(){
    //window.location.href = '/analytics';
    this.router.navigate(['/analytics']);
  }

}
