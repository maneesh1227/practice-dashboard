import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, of, shareReplay, switchMap, timer } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DataService {
  readonly newsStream$ = timer(0, 3000).pipe(
    switchMap(() => {
      // 2. Here, you would normally have this.http.get(...)
      // For now, we simulate an API response
      const mockApiData = [
        { id: Math.floor(Math.random() * 100), title: 'Pro Stream Update', value: Math.random() * 1000 }
      ];
      return of(mockApiData); 
    }),
    catchError(error => {
      console.error('PLX Stream Error:', error);
      return of([]); // Return empty array so the dashboard doesn't crash
    }),
    shareReplay(1) // 3. IMPORTANT: This ensures all "TVs" get the same data 
  );

  constructor() {}


}










//OLD METHOD (Before Refactor to DataService)

// private newsStation = new BehaviorSubject<any[]>([]);

//   // 2. The Public Pipe - components subscribe to this
//   public newsStream$ = this.newsStation.asObservable();

//   constructor() {
//     // 3. Simulating Real-time: Every 3 seconds, we send "New News"
//     setInterval(() => {
//       const newData = [
//         { id: Math.floor(Math.random() * 100), title: 'PLX Update', value: Math.random() * 1000 }
//       ];
//       console.log('News Station: Sending fresh data to all TVs...');
//       this.newsStation.next(newData); // THIS IS THE "REPRESENTATION" OF .next()
//     }, 3000);
//   }

//   // Add a function to filter the data
// filterNews(region: string) {
//   const filtered = [
//     { id: 99, title: `Filtered: ${region}`, value: Math.random() * 500 }
//   ];
//   this.newsStation.next(filtered); // Push the filtered data to everyone
// }










//new code large data with realtime

// import { Injectable } from '@angular/core';
// import { HttpClient, HttpParams } from '@angular/common/http';
// import { BehaviorSubject, Observable, timer, of } from 'rxjs';
// import { switchMap, tap, map, catchError, shareReplay, debounceTime, distinctUntilChanged } from 'rxjs/operators';

// @Injectable({
//   providedIn: 'root'
// })
// export class PlxDataService {
//   // 1. The API Endpoint (Replace with your actual Google PLX URL)
//   private readonly API_URL = 'https://jsonplaceholder.typicode.com/posts';

//   // 2. State Management: These subjects "remember" what the user is doing
//   private searchSubject = new BehaviorSubject<string>('');
//   private pageSubject = new BehaviorSubject<number>(1);
//   private loadingSubject = new BehaviorSubject<boolean>(false);

//   // Expose loading state so components can show a spinner
//   public loading$ = this.loadingSubject.asObservable();

//   // 3. THE MASTER STREAM: This reacts whenever Search or Page changes
//   public plxData$ = timer(0, 30000).pipe( // Poll every 30s as a fallback
//     // Combine the latest search term and page number
//     switchMap(() => this.searchSubject),
//     switchMap(searchTerm => this.pageSubject.pipe(
//       map(page => ({ searchTerm, page }))
//     )),
//     // When search or page changes, we trigger the API call
//     tap(() => this.loadingSubject.next(true)),
//     switchMap(({ searchTerm, page }) => this.fetchDataFromPLX(searchTerm, page)),
//     tap(() => this.loadingSubject.next(false)),
//     shareReplay(1) // Share the same data with all components (TV-1, TV-2, etc.)
//   );

//   constructor(private http: HttpClient) {}

//   // 4. THE SURGICAL API CALL: Only fetches what is needed
//   private fetchDataFromPLX(query: string, page: number): Observable<any> {
//     // We send params to the server so it filters the millions of rows for us
//     const params = new HttpParams()
//       .set('_page', page.toString())
//       .set('_limit', '10') // Only fetch 10 rows at a time
//       .set('q', query);    // Global search param for JSONPlaceholder

//     return this.http.get<any[]>(this.API_URL, { params, observe: 'response' }).pipe(
//       map(response => {
//         return {
//           data: response.body,
//           totalRecords: 100 // In a real PLX API, this comes from a header like 'x-total-count'
//         };
//       }),
//       catchError(err => {
//         console.error('PLX API Error:', err);
//         return of({ data: [], totalRecords: 0 });
//       })
//     );
//   }

//   // 5. PUBLIC METHODS: Components call these to trigger updates
//   updateSearch(term: string) {
//     this.searchSubject.next(term);
//     this.pageSubject.next(1); // Reset to page 1 on new search
//   }

//   updatePage(pageNumber: number) {
//     this.pageSubject.next(pageNumber);
//   }
// }