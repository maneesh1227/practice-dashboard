import { Routes } from '@angular/router';
import { Bar } from './components/bar/bar';
import { Analytics } from './components/analytics/analytics';
import { Dashboard } from './components/dashboard/dashboard';
import { Page } from './components/page/page';
import { VBar } from './components/v-bar/v-bar';
import { MultiData } from './components/multi-data/multi-data';

export const routes: Routes = [
    {path:'dashboard', component: Dashboard},
    { path: 'bar', component: Bar },
    {path: 'analytics', component: Analytics},
    {path: 'vbar', component: VBar},
    {path: 'multidata', component: MultiData},
    {
    path: 'page',
    component: Page,
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./components/dashboard/dashboard')
          .then(m => m.Dashboard)
      },
      {
        path: 'analytics',
        loadComponent: () => import('./components/analytics/analytics')
          .then(m => m.Analytics)
      },
      {
        path: 'bar',
        loadComponent: () => import('./components/bar/bar')
          .then(m => m.Bar)
      },
      {
        path: 'vbar',
        loadComponent: () => import('./components/v-bar/v-bar')
          .then(m => m.VBar)
      },
      {
        path: '',
        redirectTo: 'analytics',
        pathMatch: 'full'
      }
    ]
  },{
        path: '',
        redirectTo: 'page',
        pathMatch: 'full'
      }

];
