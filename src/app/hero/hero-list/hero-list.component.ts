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
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  filter,
  finalize,
  map,
  mergeMap,
  tap,
} from 'rxjs/operators';
import { ModalComponent } from '../../components/modal/modal.component';
import { SpinnerComponent } from '../../components/spinner/spinner.component';
import { Data } from '../models/hero-model';
import { HeroCardComponent } from './hero-card/hero-card.component';

@Component({
  selector: 'app-hero-list',
  standalone: true,
  imports: [
    CommonModule,
    HeroCardComponent,
    ModalComponent,
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

  constructor(
    private heroService$: HeroesService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getHero();
  }

  public searchHero(name: string): void {
    this.searchNotification$.next(name);
  }

  private getHero(): void {
    const minLength = (name: string) => name.length >= 3;

    this.heroData$ = this.searchNotification$.pipe(
      filter(minLength),
      tap(() => (this.spinnerAction = true)),
      debounceTime(300),
      distinctUntilChanged(),
      mergeMap((name) =>
        this.heroService$.search(name).pipe(
          map((res) => res.data),
          tap(this.alertWhenNoHeroes.bind(this)),
          catchError(() => {
            this.openErrorModal();
            return of({} as Data);
          }),
          finalize(() => (this.spinnerAction = false))
        )
      )
    );
  }

  private alertWhenNoHeroes(heroData: Data): void {
    const noHeroesFound: boolean = heroData?.results?.every(
      (eachResult) => eachResult === undefined
    );

    if (noHeroesFound) {
      this.openNoHeroesDialogAlert();
    }
  }

  private openNoHeroesDialogAlert(): void {
    this.dialog.open(ModalComponent, {
      data: {
        title: 'Herói não encontrado!!!',
        subtitle: 'Busque por algum heroi que exista!',
        btn: {
          title: 'Fechar',
          action: () => this.clearSearch(),
        },
      },
    });
  }

  private openErrorModal(): void {
    this.dialog.open(ModalComponent, {
      data: {
        title: 'Erro ao buscar heroi!',
        subtitle: 'Tente novamente mais tarde',
        btn: {
          title: 'Fechar',
        },
      },
    });
  }

  public redirectToHeroDetail(id: string): void {
    this.router.navigate([`hero-detail/${id}`]);
  }

  public clearSearch(): void {
    this.search.reset();
  }
}
