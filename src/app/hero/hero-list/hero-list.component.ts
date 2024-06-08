import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { EMPTY, Observable, Subject, of } from 'rxjs';
import { SearchInputComponent } from '../../components/search-input/search-input.component';
import { HeroesService } from '../services/heroes.service';

import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  mergeMap,
  tap,
} from 'rxjs/operators';
import { HeroCardComponent } from '../hero-card/hero-card.component';
import { Data } from '../services/hero-model';

@Component({
  selector: 'app-hero-list',
  standalone: true,
  imports: [
    CommonModule,
    SearchInputComponent,
    HeroCardComponent,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatPaginatorModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './hero-list.component.html',
  styleUrl: './hero-list.component.scss',
})
export class HeroListComponent implements OnInit {
  public search = new FormControl('', [Validators.required]);
  private searchNotification$: Subject<string> = new Subject<string>();
  public heroData$: Observable<Data> = EMPTY;

  constructor(private heroService$: HeroesService, private router: Router) {}

  ngOnInit(): void {
    this.getHero();
  }

  public searchHero(name: string): void {
    this.searchNotification$.next(name);
  }

  private getHero(): void {
    const minSearchLength = 3;
    this.heroData$ = this.searchNotification$.pipe(
      filter((name: string) => name.length >= minSearchLength),
      debounceTime(300),
      distinctUntilChanged(),
      mergeMap((name) =>
        this.heroService$.search(name).pipe(map((res) => res.data))
      ),
      tap(console.log)
    );
  }

  public clearSearch(): void {
    this.heroData$ = of();
  }

  public redirectToHeroDetail(id: string): void {
    this.router.navigate([`hero-detail/${id}`]);
  }

}
