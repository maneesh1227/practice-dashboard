import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Dashboard } from './components/dashboard/dashboard';
import { Analytics } from './components/analytics/analytics';
import { Bar } from './components/bar/bar';
import { TvOneComponent } from './components/tv-one-component/tv-one-component';
import { TvTwoComponent } from './components/tv-two-component/tv-two-component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,RouterLink, Dashboard, Analytics, Bar, TvOneComponent, TvTwoComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('practice-dashboard');
}
