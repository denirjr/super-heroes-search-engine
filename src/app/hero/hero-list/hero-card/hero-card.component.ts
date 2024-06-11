import { Component, Input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ImgComponent } from '../../../shared/components/img/img.component';
import { FormatImgPipe } from '../../../shared/pipes/format-img.pipe';
import { Result } from '../../models/hero-model';

@Component({
  selector: 'app-hero-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, ImgComponent, FormatImgPipe],
  templateUrl: './hero-card.component.html',
  styleUrl: './hero-card.component.scss',
})
export class HeroCardComponent {
  @Input({ required: true }) heroResult!: Result;
  protected onClick = output<void>();

  public readonly CARD_DIMENSIONS = {
    width: '150',
    height: '150',
  };

  public btnAction(): void {
    this.onClick.emit();
  }
}
