import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';

import { StorageService } from '../../../core/services/storage.service';

@Component({
  selector: 'app-default-auth-layout',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './default-auth-layout.component.html',
  styleUrl: './default-auth-layout.component.css',
})
export class DefaultAuthLayoutComponent {
  constructor(
    public storageService: StorageService
  ) {}

  @Input() titlePage: string = '';
  @Input() subTitlePage: string = '';
  @Input() pageTitle: string = '';
  @Input() primaryBtnText: string = '';
  @Input() secondaryBtnText: string = '';
  @Input() secondaryBtnRoute: string = '';

  @Output('submit') onSubmit = new EventEmitter<void>();
  @Output('navigate') onNavigate = new EventEmitter<void>();

  submit() {
    this.onSubmit.emit();
  }

  navigate() {
    this.onNavigate.emit();
  }
}
