import { Pipe, PipeTransform } from '@angular/core';

export interface Thumbnail {
  path: string;
  extension: string;
}

@Pipe({
  name: 'formatImg',
  standalone: true,
})
export class FormatImgPipe implements PipeTransform {
  transform(thumbnail: Thumbnail): string {
    if (!thumbnail) {
      return '';
    }
    return `${thumbnail.path}.${thumbnail.extension}`;
  }
}
