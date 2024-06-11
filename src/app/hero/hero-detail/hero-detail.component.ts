import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute } from '@angular/router';
import { finalize, map } from 'rxjs';
import { ImgComponent } from '../../shared/components/img/img.component';
import { SpinnerComponent } from '../../shared/components/spinner/spinner.component';
import { FormatImgPipe } from '../../shared/pipes/format-img.pipe';
import { ComicModel, Result as ComicResults } from '../models/comics-model';
import { Result } from '../models/hero-model';
import { HeroSuffixEnum, HeroesService } from '../services/heroes.service';
import { Result as MovieResults, MoviesModel } from '../services/movies-model';

@Component({
  selector: 'app-hero-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatTabsModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    FormatImgPipe,
    ImgComponent,
    SpinnerComponent,
  ],
  templateUrl: './hero-detail.component.html',
  styleUrl: './hero-detail.component.scss',
})
export class HeroDetailComponent {
  public result!: Result;
  public comics: ComicResults[] = [];
  public movies: MovieResults[] = [];
  public spinnerAction = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private heroService$: HeroesService
  ) {}

  ngOnInit() {
    this.getHeroDetail();
    this.getComics();
    this.getMovies();
  }

  private getHeroDetail(): void {
    this.activatedRoute.data
      .pipe(map(({ hero }, idx) => hero.data.results[idx]))
      .subscribe((res) => {
        this.result = res;
      });
  }

  private getComics(): void {
    this.spinnerAction = true;
    this.heroService$
      .searchById<ComicModel>(this.result?.id.toString(), HeroSuffixEnum.COMICS)
      .pipe(
        map((res) => res.data.results),
        finalize(() => (this.spinnerAction = false))
      )
      .subscribe((res) => (this.comics = res));
  }

  private getMovies(): void {
    this.spinnerAction = true;
    this.heroService$
      .searchById<MoviesModel>(this.result?.id.toString(), HeroSuffixEnum.MOVIE)
      .pipe(
        map((res) => res.data.results),
        finalize(() => (this.spinnerAction = false))
      )
      .subscribe((res) => (this.movies = res));
  }
}
