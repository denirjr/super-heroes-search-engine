import { inject } from '@angular/core';
import {
  ResolveFn,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { HeroModel } from '../services/hero-model';
import { HeroesService } from '../services/heroes.service';

export const heroResolver: ResolveFn<HeroModel> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  return inject(HeroesService).searchById(route.paramMap.get('id')!);
};
