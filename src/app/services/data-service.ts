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
