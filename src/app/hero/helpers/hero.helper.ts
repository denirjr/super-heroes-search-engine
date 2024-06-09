import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { HeroModel } from '../models/hero-model';
import { HeroesService } from '../services/heroes.service';

export const heroResolver: ResolveFn<HeroModel> = (
  route: ActivatedRouteSnapshot
) => inject(HeroesService).searchById(route.paramMap.get('id')!);
