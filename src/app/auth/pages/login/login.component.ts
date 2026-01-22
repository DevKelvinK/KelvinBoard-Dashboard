import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';

import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../../core/services/toast.service';

interface LoginForm {
  email: FormControl,
  password: FormControl
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup<LoginForm>;
  constructor(
    private router: Router,
    private AuthService: AuthService,
    private toastService: ToastService
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    })
  }

  // Getters para acessar os FormControls do form (email e senha)
  get emailControl(): FormControl {
    return this.loginForm.get('email') as FormControl;
  }

  get passwordControl(): FormControl {
    return this.loginForm.get('password') as FormControl;
  }

  errorButton = false;
  clicked = false;
  // Atualização dinâmica da cor do botão conforme validação dos formulários
  ngOnInit() {
    this.loginForm.statusChanges.subscribe(() => {
      if (this.clicked) {
        this.errorButton = this.loginForm.invalid;
      }
    });
  }

  isLoading = false;
  submit() {
    this.clicked = true;

    if (this.loginForm.invalid || this.isLoading) {
      this.errorButton = true;
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    this.AuthService.login(this.loginForm.value.email,this.loginForm.value.password)
    .pipe(finalize(() => {this.isLoading = false}))
    .subscribe({
      next: () => 
      {
        this.toastService.success('Login realizado com sucesso!');
        this.router.navigate(['/dashboard'])
      },
      error: (err) => 
      {
        if (err.field === 'email') {
          this.emailControl.setErrors({ notFound: true });
        } 
        this.toastService.error(err.message);
        this.errorButton = true;
        this.emailControl.markAsTouched();
      }
    })
  }
}
