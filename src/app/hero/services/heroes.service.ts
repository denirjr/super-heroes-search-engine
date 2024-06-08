import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { HeroModel } from './hero-model';

export enum HeroSuffixEnum {
  MOVIE = 'series',
  COMICS = 'comics',
}

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  private readonly ROOT_URL: string =
    'https://gateway.marvel.com:443/v1/public/';

  constructor(private http: HttpClient) {}

  public search(name: string): Observable<HeroModel> {
    const options = new HttpParams()
      .set('nameStartsWith', name)
      .set('limit', '20')
      .set('apikey', environment.publicKey);

    return this.http.get<HeroModel>(`${this.ROOT_URL}characters`, {
      params: options,
    });
  }

  public searchById<T>(id: string, suffix?: HeroSuffixEnum): Observable<T> {
    const options = new HttpParams().set('apikey', environment.publicKey);

    return this.http.get<T>(
      `${this.ROOT_URL}characters/${id}${suffix ? '/' : ''}${
        suffix ? suffix : ''
      }`,
      { params: options }
    );
  }
}
