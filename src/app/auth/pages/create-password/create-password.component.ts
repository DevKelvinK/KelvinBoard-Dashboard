import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

interface CreatePasswordForm {
  email: FormControl,
  code: FormControl,
  newPassword: FormControl,
  newPasswordConfirm: FormControl
}

@Component({
  selector: 'app-create-password',
  templateUrl: './create-password.component.html',
  styleUrl: './create-password.component.css'
})
export class CreatePasswordComponent {
  createPasswordForm: FormGroup<CreatePasswordForm>;

  constructor(
    private router: Router,
    private AuthService: AuthService)
  {
    this.createPasswordForm = new FormGroup(
      {
        email: new FormControl('', [Validators.required, Validators.email]),
        code: new FormControl('', [Validators.required]),
        newPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
        newPasswordConfirm: new FormControl('', [Validators.required, Validators.minLength(8)])
      },
      { validators: this.passwordConfirmationValidation }
    )
  }

  passwordConfirmationValidation(from: AbstractControl) {
    const pass = from.get('newPassword')?.value;
    const passConfirm = from.get('newPassword')?.value;

    if (pass !== passConfirm) {
      return {passwordMismatch: true}
    }

    return null;
  }

  submit() {
    if (this.createPasswordForm.invalid) return;

    if (this.createPasswordForm.value.newPassword !== this.createPasswordForm.value.newPasswordConfirm) {
      return this.createPasswordForm.setErrors({passwordMismatch: true})
    }

    this.AuthService.createPassword(
      this.createPasswordForm.value.email,
      this.createPasswordForm.value.code,
      this.createPasswordForm.value.newPassword
    ).subscribe({
      next: () => {
        console.log("Senha criada com secesso!")
        this.router.navigate(['/login'])
      },
      error: (err) => console.error(err.message)
    })
  }

  navigate() {
    this.router.navigate(["login"])
  }
}