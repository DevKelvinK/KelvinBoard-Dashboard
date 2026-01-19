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

  constructor(
    private router: Router,
    private AuthService: AuthService
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    })
  }

  submit() {
    if (this.loginForm.invalid) return;

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

  navigate() {
    this.router.navigate(["register"])
  }
}
