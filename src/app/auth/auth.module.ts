import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { CreatePasswordComponent } from './pages/create-password/create-password.component';
import { PasswordRecoveryComponent } from './pages/password-recovery/password-recovery.component';
import { DefaultAuthLayoutComponent } from './components/default-auth-layout/default-auth-layout.component';
import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule,
    DefaultAuthLayoutComponent,
  ],
  declarations: [
    LoginComponent,
    CreatePasswordComponent,
    PasswordRecoveryComponent
  ]
})
export class AuthModule { }
