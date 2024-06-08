import { Component, Input, output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Data, Result, Thumbnail } from '../services/hero-model';
import { NgOptimizedImage } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-hero-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, NgOptimizedImage],
  templateUrl: './hero-card.component.html',
  styleUrl: './hero-card.component.scss',
})
export class HeroCardComponent {
  @Input() heroResult: Partial<Result> = {};
  onClick = output<void>();

  public getImage(thumbnail: Thumbnail | undefined): string {
    if (!thumbnail) {
      return '';
    }
    return `${thumbnail.path}.${thumbnail.extension}`;
  }

  public btnAction(): void {
    this.onClick.emit();
  }
}
