export interface MoviesModel {
    code: number;
    status: string;
    copyright: string;
    attributionText: string;
    attributionHTML: string;
    etag: string;
    data: Data;
  }
  export interface Data {
    offset: number;
    limit: number;
    total: number;
    count: number;
    results: Result[];
  }
  export interface Result {
    id: number;
    title: string;
    description?: string;
    resourceURI: string;
    urls: Url[];
    startYear: number;
    endYear: number;
    rating: string;
    type: string;
    modified: string;
    thumbnail: Thumbnail;
    creators: Creators;
    characters: Characters;
    stories: Stories;
    comics: Characters;
    events: Events;
    next?: Item2;
    previous?: Item2;
  }
  export interface Events {
    available: number;
    collectionURI: string;
    items: Item2[];
    returned: number;
  }
  export interface Stories {
    available: number;
    collectionURI: string;
    items: Item3[];
    returned: number;
  }
  export interface Item3 {
    resourceURI: string;
    name: string;
    type: string;
  }
  export interface Characters {
    available: number;
    collectionURI: string;
    items: Item2[];
    returned: number;
  }
  export interface Item2 {
    resourceURI: string;
    name: string;
  }
  export interface Creators {
    available: number;
    collectionURI: string;
    items: Item[];
    returned: number;
  }
  export interface Item {
    resourceURI: string;
    name: string;
    role: string;
  }
  export interface Thumbnail {
    path: string;
    extension: string;
  }
  export interface Url {
    type: string;
    url: string;
  }