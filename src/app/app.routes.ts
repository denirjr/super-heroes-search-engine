import { Routes } from '@angular/router';
import { heroResolver } from './hero/helpers/hero.helper';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../app/hero/hero-list/hero-list.component').then(
        (c) => c.HeroListComponent
      ),
  },
  {
    path: 'hero-detail/:id',
    loadComponent: () =>
      import('../app/hero/hero-detail/hero-detail.component').then(
        (c) => c.HeroDetailComponent
      ),
    resolve: { hero: heroResolver },
  },
];
