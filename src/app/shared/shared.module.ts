import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { BaseInputComponent } from './components/base-input/base-input.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BaseInputComponent
  ],
  exports: [
    BaseInputComponent
  ]
})
export class SharedModule { }
