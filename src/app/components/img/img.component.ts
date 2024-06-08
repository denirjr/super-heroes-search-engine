import { NgOptimizedImage } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-img',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './img.component.html',
  styleUrl: './img.component.scss',
})
export class ImgComponent {
  @Input({ required: true }) image: string = '';
  @Input({ required: true }) alt: string = '';
  @Input() dimensions = {
    width: '200',
    height: '200',
  };
}
