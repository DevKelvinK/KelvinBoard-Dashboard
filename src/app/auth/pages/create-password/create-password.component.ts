import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../../core/services/toast.service';
import { finalize } from 'rxjs';

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
  constructor(
    private router: Router,
    private AuthService: AuthService,
    private toastService: ToastService
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

  // Adiciona erro "passwordMismatch" caso senha e confirmação de senha não coincidirem
  passwordConfirmationValidation(from: AbstractControl) {
    const pass = from.get('newPassword')?.value;
    const passConfirm = from.get('newPasswordConfirm')?.value;

    if (!pass || !passConfirm) {
      return null
    }

    if (pass !== passConfirm) {
      return { passwordMismatch: true }
    } else {
      return null;
    }
  }

  // Atualização dinâmica da cor do botão conforme validação dos formulários
  errorButton = false;
  clicked = false;
  ngOnInit() {
    this.createPasswordForm.statusChanges.subscribe(() => {
      if (this.clicked) {
        this.errorButton = this.createPasswordForm.invalid;
      }
    });
  }

  isLoading = false;
  submit() {
    this.clicked = true;

    if (this.createPasswordForm.invalid) {
      this.errorButton = true;
      this.createPasswordForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    this.AuthService.createPassword
    (
      this.createPasswordForm.value.email,
      this.createPasswordForm.value.code,
      this.createPasswordForm.value.newPassword,
    ).pipe(finalize(() => {this.isLoading = false}))
    .subscribe({
      next: () => {
        this.toastService.success('Senha criada com sucesso!');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        if (err.field === 'email') {
          this.emailControl.setErrors({ notFound: true });
        } 
        this.toastService.error(err.message);
        this.errorButton = true;
        this.emailControl.markAsTouched();
      }
    });
  }
}