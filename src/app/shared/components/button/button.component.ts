import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {
  @Input() isLoading: boolean = false
  @Input() loadingMessage: string = 'Carregando...'
  @Input() errorButton: boolean = false
}
