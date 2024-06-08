export interface HeroModel {
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
    name: string;
    description: string;
    modified: string;
    thumbnail: Thumbnail;
    resourceURI: string;
    comics: Comics;
    series: Comics;
    stories: Stories;
    events: Comics;
    urls: Url[];
  }
  export interface Url {
    type: string;
    url: string;
  }
  export interface Stories {
    available: number;
    collectionURI: string;
    items: Item2[];
    returned: number;
  }
  export interface Item2 {
    resourceURI: string;
    name: string;
    type: string;
  }
  export interface Comics {
    available: number;
    collectionURI: string;
    items: Item[];
    returned: number;
  }
  export interface Item {
    resourceURI: string;
    name: string;
  }
  export interface Thumbnail {
    path: string;
    extension: string;
  }