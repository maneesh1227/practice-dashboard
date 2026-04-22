import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { timer } from 'rxjs/internal/observable/timer';
import { catchError } from 'rxjs/internal/operators/catchError';
import { shareReplay } from 'rxjs/internal/operators/shareReplay';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { tap } from 'rxjs/internal/operators/tap';

@Injectable({
  providedIn: 'root',
})
export class MultiDataService {
  constructor(private httpClient: HttpClient){}
  private baseUrl = 'https://jsonplaceholder.typicode.com/posts';

  private loadingSubject$ = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject$.asObservable();

  getMockData(page: number, limit: number): Observable<any> {
    this.loadingSubject$.next(true);
    
    const params = new HttpParams()
      .set('_page', page.toString())
      .set('_limit', limit.toString());

    return this.httpClient.get<any[]>(this.baseUrl, { params }).pipe(
      tap(() => this.loadingSubject$.next(false)),
      catchError(err => {
        this.loadingSubject$.next(false);
        return of([]); // Return empty array so UI doesn't crash
      })
    );
  }

  // 3. Practice Real-Time (The "Auto-Refresh" approach)
  // This will poll the API every 10 seconds
  getRealTimeUpdates() {
    return timer(0, 10000).pipe(
      switchMap(() => this.getMockData(1, 5)),
      shareReplay(1) 
    );
  }
}
