import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
    },
    {
        path: 'dashboard',
        loadComponent: () => import('./shared/components/dashboard/dashboard').then(m => m.Dashboard)
    },
    {
        path: 'calendar',
        loadComponent: () => import('./shared/components/calendar/calendar').then(m => m.Calendar)
    },
    {
        path: '**',
        redirectTo: '/dashboard'
    }
];
