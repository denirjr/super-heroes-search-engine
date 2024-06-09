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
import { HeroesService } from '../services/heroes.service';

import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  finalize,
  map,
  mergeMap,
  tap,
} from 'rxjs/operators';
import { SpinnerComponent } from '../../components/spinner/spinner.component';
import { Data } from '../models/hero-model';
import { HeroCardComponent } from './hero-card/hero-card.component';
import { EMPTY_OBSERVER } from 'rxjs/internal/Subscriber';

@Component({
  selector: 'app-hero-list',
  standalone: true,
  imports: [
    CommonModule,
    HeroCardComponent,
    SpinnerComponent,
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
  public spinnerAction: boolean = false;

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
      tap(() => (this.spinnerAction = true)),
      debounceTime(300),
      distinctUntilChanged(),
      mergeMap((name) =>
        this.heroService$.search(name).pipe(
          map((res) => res.data),
          finalize(() => (this.spinnerAction = false))
        )
      )
    );
  }

  public clearSearch(): void {
    this.search.reset();
  }

  public redirectToHeroDetail(id: string): void {
    this.router.navigate([`hero-detail/${id}`]);
  }
}
