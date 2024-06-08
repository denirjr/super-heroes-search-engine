import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { ImgComponent } from '../../components/img/img.component';
import { FormatImgPipe } from '../../pipes/format-img.pipe';
import { ComicModel, Result as ComicResults } from '../services/comics-model';
import { MoviesModel, Result as MovieResults } from '../services/movies-model';
import { Result } from '../services/hero-model';
import { HeroSuffixEnum, HeroesService } from '../services/heroes.service';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-hero-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatTabsModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    ImgComponent,
    FormatImgPipe,
  ],
  templateUrl: './hero-detail.component.html',
  styleUrl: './hero-detail.component.scss',
})
export class HeroDetailComponent {
  public result!: Result;
  public comics: ComicResults[] = [];
  public movies: MovieResults[] = [];

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
    this.heroService$
      .searchById<ComicModel>(this.result?.id.toString(), HeroSuffixEnum.COMICS)
      .pipe(map((res) => res.data.results))
      .subscribe((res) => (this.comics = res));
  }

  private getMovies(): void {
    this.heroService$
      .searchById<MoviesModel>(this.result?.id.toString(), HeroSuffixEnum.MOVIE)
      .pipe(map((res) => res.data.results))
      .subscribe((res) => (this.movies = res));
  }
}
