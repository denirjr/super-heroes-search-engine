import { Component, Input, output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { NgOptimizedImage } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Result, Thumbnail } from '../../services/hero-model';
import { FormatImgPipe } from '../../../pipes/format-img.pipe';
import { ImgComponent } from '../../../components/img/img.component';

@Component({
  selector: 'app-hero-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, ImgComponent, FormatImgPipe],
  templateUrl: './hero-card.component.html',
  styleUrl: './hero-card.component.scss',
})
export class HeroCardComponent {
  @Input({required: true}) heroResult!: Result;
  protected onClick = output<void>();

  public readonly CARD_DIMENSIONS = {
    width: "150",
    height: "150",
  }

  public btnAction(): void {
    this.onClick.emit();
  }
}