import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

interface PasswordRecoveryForm {
  email: FormControl;
  code: FormControl;
  newPassword: FormControl;
  newPasswordConfirm: FormControl;
}

type PasswordStrength = 'weak' | 'medium' | 'strong' | 'veryStrong';
type step = 1 | 2;

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.css']
})
export class PasswordRecoveryComponent {
  passwordRecoveryForm: FormGroup<PasswordRecoveryForm>;
  passwordStrengthLevel: PasswordStrength = 'weak';
  activeStep: step = 1;
  errorButton = false;
  clicked = false;


  constructor(
    private router: Router,
    private AuthService: AuthService
  ) {
    this.passwordRecoveryForm = new FormGroup(
      {
        email: new FormControl('', [Validators.required, Validators.email]),
        code: new FormControl('', [Validators.required]),
        newPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
        newPasswordConfirm: new FormControl('', [Validators.required])
      },
      { validators: this.passwordConfirmationValidation }
    )

    this.passwordRecoveryForm.get('newPassword')?.valueChanges.subscribe(
      value => {this.passwordStrengthLevel = this.passwordStrength(value)}
    )
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
    this.passwordRecoveryForm.statusChanges.subscribe(() => {
      if (!this.clicked) return;

      if (this.activeStep === 1) {
        this.errorButton = this.emailControl.invalid;
      }

      if (this.activeStep === 2) {
        this.errorButton = this.passwordRecoveryForm.invalid;
      }
    });
  }

  // Getters para acessar os FormControls do form (email, código, senha e confirmação de senha)
  get emailControl(): FormControl {
    return this.passwordRecoveryForm.get('email') as FormControl;
  }

  get codeControl(): FormControl {
    return this.passwordRecoveryForm.get('code') as FormControl;
  }

  get newPasswordControl(): FormControl {
    return this.passwordRecoveryForm.get('newPassword') as FormControl;
  }

  get newPasswordConfirmControl(): FormControl {
    return this.passwordRecoveryForm.get('newPasswordConfirm') as FormControl;
  }

  // Função para indicador de força de senha
  passwordStrength(password: string): PasswordStrength {
    let strength = 0

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

  changeAction () {
    if (this.activeStep === 1) {
      this.changeStep()
    } else {
      this.submit()
    }
  }

  changeStep () {
    this.clicked = true;

    if (this.emailControl.invalid) {
      this.errorButton = true;
      this.emailControl.markAsTouched();
      return;
    }

    this.AuthService.requestPasswordReset(
      this.passwordRecoveryForm.value.email
    ).subscribe({
      next: () => {
        this.activeStep = 2;
        this.errorButton = false;
      },
      error: () => {
        this.emailControl.setErrors({ notFound: true });
        this.errorButton = true;
      }
    });

  }

  submit() {
    this.clicked = true;

    if (this.passwordRecoveryForm.invalid) {
      this.errorButton = true;
      this.passwordRecoveryForm.markAllAsTouched();
      return;
    }

    if (
      this.passwordRecoveryForm.value.newPassword !==
      this.passwordRecoveryForm.value.newPasswordConfirm
    ) {
      this.errorButton = true;
      return this.passwordRecoveryForm.setErrors({ passwordMismatch: true });
    }

    this.AuthService.confirmPasswordReset(
      this.passwordRecoveryForm.value.email,
      this.passwordRecoveryForm.value.code,
      this.passwordRecoveryForm.value.newPassword,
    ).subscribe({
      next: () => {
        console.log('Nova senha criada com secesso!');
        this.router.navigate(['/login']);
      },
      error: (err) => console.error(err.message),
    });
  }
}
