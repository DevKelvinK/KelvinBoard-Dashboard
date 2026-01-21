import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';

import { User } from '../models/user.model';
import { AuthResponse } from '../models/auth-response.model';
import { PasswordResetResponse } from '../models/password-reset-response.model';

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
  
  login(email: string, password: string): Observable<AuthResponse> {
    const userFound = this.users.find((user) => user.email === email);

    if (!userFound) {
      return throwError(() => new Error('Email não encontrado.')).pipe(delay(800));
    }

    if (!userFound.password) {
      return throwError(() => new Error('Usuário sem senha cadastrada, click em "Primeiro acesso" abaixo.')).pipe(delay(800));
    }

    if (userFound.password !== password) {
      return throwError(() => new Error('Senha inválida, tente novamente.')).pipe(delay(800),
      );
    }

    return of({token: 'mock-token-123'}).pipe(delay(800));
  }

  createPassword(email: string, code: string, newPassword: string): Observable<void> {
    if (code !== '123456') {
      return throwError(() => new Error('Código informado inválido!')).pipe(delay(800))
    }

    const userFound = this.users.find((user) => user.email === email);

    if (!userFound) {
      return throwError(() => new Error('Usuário não encontrado, digite um email cadastrado.')).pipe(delay(800));
    }

    if (userFound.password) {
      return throwError(() => new Error('Esse email já possui uma senha.')).pipe(delay(800));
    }

    userFound.password = newPassword;

    return of(void 0).pipe(delay(800));
  }

  requestPasswordReset(email: string): Observable<PasswordResetResponse> {
    const userFound = this.users.find((user) => user.email === email);
    
    if (!userFound) {
      return throwError(() => new Error('Usuário não encontrado, digite um email cadastrado.')).pipe(delay(800));
    }

    return of({ resetId: '123456' }).pipe(delay(800));
  }

  confirmPasswordReset(email: string, code: string, newPassword: string): Observable<void> {
    if (code !== '123456') {
      return throwError(() => new Error('Código informado inválido!')).pipe(delay(800))
    }

    const userFound = this.users.find((user) => user.email === email);

    if (!userFound) {
      return throwError(() => new Error('Usuário não encontrado, digite um email cadastrado.')).pipe(delay(800));
    }
    
    userFound.password = newPassword;

    return of(void 0).pipe(delay(800));
  }
}