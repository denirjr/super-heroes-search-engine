import { TestBed, fakeAsync, tick, waitForAsync } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HeroModel } from '../models/hero-model';
import { HeroesService } from './heroes.service';
import { EMPTY, of } from 'rxjs';

describe('HeroesService', () => {
  let service: HeroesService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(HeroesService);
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Should search', fakeAsync(() => {
    const spy = spyOn(service, 'search').and.returnValue(EMPTY);

    service.search('thor').subscribe((res) => {
      expect(res).toBe(spy);
    });

    tick();
  }));

  it('Should search by id', fakeAsync(() => {
    const spy = spyOn(service, 'searchById').and.callThrough();

    service.searchById('1').subscribe(() => {
      expect(spy).toHaveBeenCalled();
    });
    tick();
  }));
});
