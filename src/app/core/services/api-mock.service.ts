import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay, dematerialize, materialize } from 'rxjs/operators';

import { User } from '../models/user.model';
import { AuthResponse } from '../models/auth-response.model';
import { PasswordResetResponse } from '../models/password-reset-response.model';

interface PasswordResetData {
  email: string;
  code: string;
  createAt: number;
}

@Injectable({
  providedIn: 'root',
})

export class ApiMockService {
  private users: User[] = [
    {
      email: 'primeiroacesso@email.com',
      password: null,
    },
    {
      email: 'tenhosenha@email.com',
      password: 'tenhoSenh@123',
    },
    {
      email: 'esquecisenha@email.com',
      password: 'esqueciSenh@123',
    },
  ];

  private passwordResetData: PasswordResetData | null = null;

  private ramDelay(min = 600, max = 1200): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private simulateError(field: string, message: string) {
    return throwError(() => ({ field, message })).pipe(
      // Simulação de delay na resposta do erro.
      materialize(),
      delay(this.ramDelay()),
      dematerialize()
    );
  }
  
  login(email: string, password: string): Observable<AuthResponse> {
    const userFound = this.users.find((user) => user.email === email);

    if (!userFound) {
      return this.simulateError('email', 'Usuário não encontrado, digite um email cadastrado.');
    }

    if (!userFound.password) {
      return this.simulateError('password', 'Usuário sem senha cadastrada, click em "Crie uma senha".');
    }

    if (userFound.password !== password) {
      return this.simulateError('password', 'Senha inválida, tente novamente.');
    }

    return of({token: 'mock-token-123'}).pipe(delay(this.ramDelay()));
  }

  createPassword(email: string, code: string, newPassword: string): Observable<void> {
    const userFound = this.users.find((user) => user.email === email);

    if (!userFound) {
      return this.simulateError('email', 'Usuário não encontrado, digite um email cadastrado.');
    }

    if (code !== '123456') {
      return this.simulateError('code', 'Código informado inválido!');
    }

    if (userFound.password) {
      return this.simulateError('password', 'Esse email já possui uma senha.');
    }

    userFound.password = newPassword;

    return of(void 0).pipe(delay(this.ramDelay()));
  }

  requestPasswordReset(email: string): Observable<PasswordResetResponse> {
    const userFound = this.users.find((user) => user.email === email);
    
    if (!userFound) {
      return this.simulateError('email', 'Usuário não encontrado, digite um email cadastrado.');
    }

    this.passwordResetData = {
      email,
      code: '123456',
      createAt: Date.now(),
    };

    return of({ resetId: this.passwordResetData.code }).pipe(delay(this.ramDelay()));
  }

  confirmPasswordReset(email: string, code: string, newPassword: string): Observable<void> {
    if (!this.passwordResetData) {
      return this.simulateError('email', 'Nenhum pedido de recuperação de senha encontrado para esse email.');
    }
    
    const codeExpired = (Date.now() - this.passwordResetData.createAt) > 2 * 60 * 1000;
    if (codeExpired) {
      return this.simulateError('code', 'Código expirado, solicite um novo código de recuperação.');
    }

    if (code !== this.passwordResetData.code) {
      return this.simulateError('code', 'Código informado inválido!');
    }

    const userFound = this.users.find((user) => user.email === email);
    (userFound) && (userFound.password = newPassword)

    this.passwordResetData = null;

    return of(void 0).pipe(delay(this.ramDelay()));
  }
}