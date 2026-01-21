import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

interface CreatePasswordForm {
  email: FormControl;
  code: FormControl;
  newPassword: FormControl;
  newPasswordConfirm: FormControl;
}

type PasswordStrength = 'weak' | 'medium' | 'strong' | 'veryStrong';

@Component({
  selector: 'app-create-password',
  templateUrl: './create-password.component.html',
  styleUrl: './create-password.component.css',
})
export class CreatePasswordComponent {
  createPasswordForm: FormGroup<CreatePasswordForm>;
  passwordStrengthLevel: PasswordStrength = 'weak';
  errorButton = false;
  clicked = false;

  constructor(
    private router: Router,
    private AuthService: AuthService,
  ) {
    this.createPasswordForm = new FormGroup(
      {
        email: new FormControl('', [Validators.required, Validators.email]),
        code: new FormControl('', [Validators.required]),
        newPassword: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
        ]),
        newPasswordConfirm: new FormControl('', [Validators.required]),
      },
      { validators: this.passwordConfirmationValidation },
    );

    this.createPasswordForm
      .get('newPassword')
      ?.valueChanges.subscribe((value) => {
        this.passwordStrengthLevel = this.passwordStrength(value);
      });
  }

  // Adiciona erro "passwordMismatch" caso senha e confirmação de senha não coincidirem
  passwordConfirmationValidation(from: AbstractControl) {
    const pass = from.get('newPassword')?.value;
    const passConfirm = from.get('newPasswordConfirm')?.value;

    if (pass !== passConfirm) {
      return { passwordMismatch: true };
    }

    return null;
  }

  // Atualização dinâmica da cor do botão conforme validação dos formulários
  ngOnInit() {
    this.createPasswordForm.statusChanges.subscribe(() => {
      if (this.clicked) {
        this.errorButton = this.createPasswordForm.invalid;
      }
    });
  }

  // Getters para acessar os FormControls do form (email, código, senha e confirmação de senha)
  get emailControl(): FormControl {
    return this.createPasswordForm.get('email') as FormControl;
  }

  get codeControl(): FormControl {
    return this.createPasswordForm.get('code') as FormControl;
  }

  get newPasswordControl(): FormControl {
    return this.createPasswordForm.get('newPassword') as FormControl;
  }

  get newPasswordConfirmControl(): FormControl {
    return this.createPasswordForm.get('newPasswordConfirm') as FormControl;
  }

  // Função para indicador de força de senha
  passwordStrength(password: string): PasswordStrength {
    let strength = 0;

    if (!password) {
      return 'weak';
    }

    // Se estiver com mínimo de 8 caracteres
    if (password.length >= 8) strength++;
    // Se tiver letra maiúscula
    if (/[A-Z]/.test(password)) strength++;
    // Se tiver número
    if (/[0-9]/.test(password)) strength++;
    // Se tiver algum caractere especial
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    switch (strength) {
      case 0:
      case 1:
        return 'weak';
      case 2:
        return 'medium';
      case 3:
        return 'strong';
      case 4:
        return 'veryStrong';
      default:
        return 'weak';
    }
  }

  submit() {
    this.clicked = true;

    if (this.createPasswordForm.invalid) {
      this.errorButton = true;
      this.createPasswordForm.markAllAsTouched();
      return;
    }

    if (
      this.createPasswordForm.value.newPassword !==
      this.createPasswordForm.value.newPasswordConfirm
    ) {
      this.errorButton = true;
      return this.createPasswordForm.setErrors({ passwordMismatch: true });
    }

    this.AuthService.createPassword(
      this.createPasswordForm.value.email,
      this.createPasswordForm.value.code,
      this.createPasswordForm.value.newPassword,
    ).subscribe({
      next: () => {
        console.log('Senha criada com secesso!');
        this.router.navigate(['/login']);
      },
      error: (err) => console.error(err.message),
    });
  }
}
