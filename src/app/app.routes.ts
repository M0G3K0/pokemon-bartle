import { Routes } from '@angular/router';
import { StyleGuideComponent } from './features/style-guide/style-guide.component';

export const routes: Routes = [
	{ path: 'style-guide', component: StyleGuideComponent },
	{ path: '', loadComponent: () => import('./features/game/game.component').then(m => m.GameComponent) },
];
