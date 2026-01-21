import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

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
  errorButton = false;
   clicked = false;

  constructor(
    private router: Router,
    private AuthService: AuthService
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    })
  }

  // Atualização dinâmica da cor do botão conforme validação dos formulários
  ngOnInit() {
    this.loginForm.statusChanges.subscribe(() => {
      if (this.clicked) {
        this.errorButton = this.loginForm.invalid;
      }
    });
  }

  // Getters para acessar os FormControls do form (email e senha)
  get emailControl(): FormControl {
    return this.loginForm.get('email') as FormControl;
  }

  get passwordControl(): FormControl {
    return this.loginForm.get('password') as FormControl;
  }

  submit() {
    this.clicked = true;

    if (this.loginForm.invalid) {
      this.errorButton = true;
      this.loginForm.markAllAsTouched();
      return;
    }

    this.AuthService.login(
      this.loginForm.value.email,
      this.loginForm.value.password
    ).subscribe({
      next: () => {
        console.log("Login realizado");
        this.router.navigate(['/dashboard'])
      },
      error: (err) => console.error(err.message)
    })
  }
}
