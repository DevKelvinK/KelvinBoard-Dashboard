import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../../core/services/toast.service';
import { finalize } from 'rxjs';

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
  constructor(
    private router: Router,
    private AuthService: AuthService,
    private toastService: ToastService
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

  // Lógica para reenvio de código de recuperação.
  canResendCode = false;
  resendCountdown = 30;
  private resendTimer?: number;
  private startCodeTimer() {
    this.canResendCode = false;
    this.resendCountdown = 30;

    this.resendTimer = window.setInterval(() => {
      this.resendCountdown--

      if (this.resendCountdown === 0) {
        this.canResendCode = true;
        clearInterval(this.resendTimer);
      }
    }, 1000);
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
  activeStep: step = 1;
  errorButton = false;
  clicked = false;
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

  onSubmit () {
    if (this.activeStep === 1) {
      this.sendCode()
    } else {
      this.submit()
    }
  }

  isLoading = false;
  sendCode () {
    this.clicked = true;

    if (this.emailControl.invalid) {
      this.errorButton = true;
      this.emailControl.markAsTouched();
      return;
    }

    this.isLoading = true;

    this.AuthService.requestPasswordReset(this.passwordRecoveryForm.value.email)
    .pipe(finalize(() => {this.isLoading = false}))
    .subscribe({
      next: () => {
        this.toastService.success(`Código de recuperação ${this.activeStep === 2 ? 'reenviado' : 'enviado'} para o seu email! (Seu código expira em 2 minutos) Código (mock) para testes: 123456`, 10000);
        this.errorButton = false;
        this.startCodeTimer();
        if (this.activeStep === 1) {
          this.activeStep = 2;
        }
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

  submit() {
    this.clicked = true;

    if (this.passwordRecoveryForm.invalid) {
      this.errorButton = true;
      this.passwordRecoveryForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    this.AuthService.confirmPasswordReset
    (
      this.passwordRecoveryForm.value.email,
      this.passwordRecoveryForm.value.code,
      this.passwordRecoveryForm.value.newPassword,
    )
    .pipe(finalize(() => {this.isLoading = false}))
    .subscribe({
      next: () => {
        this.toastService.success('Nova senha criada com secesso!');
        this.router.navigate(['/login']);
      },
      error: (err) =>  {
        this.toastService.error(err.message);
      }
    });
  }
}
