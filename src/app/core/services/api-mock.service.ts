import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';

import { User } from '../models/user.model';
import { AuthReponse } from '../../auth/dto/auth-response.dto';

@Injectable({
  providedIn: 'root',
})

export class ApiMockService {

  private users: User[] = [
    {
      email: 'teste@email.com',
      password: null,
    },
  ];

  createPassword(email: string, code: string, newPassword: string): Observable<void> {
    if (code !== '123456') {
      return throwError(() => new Error('Código informado inválido!')).pipe(delay(800))
    }

    const userFound = this.users.find((user) => user.email === email);

    if (!userFound) {
      return throwError(() => new Error('Usuário não encontrado.')).pipe(delay(800));
    }

    if (userFound.password) {
      return throwError(() => new Error('Esse email já possui uma senha.')).pipe(delay(800));
    }

    userFound.password = newPassword;

    return of(void 0).pipe(delay(800));
  }

  login(email: string, password: string): Observable<AuthReponse> {
    const userFound = this.users.find((user) => user.email === email);

    if (!userFound) {
      return throwError(() => new Error('Usuário não encontrado.')).pipe(delay(800));
    }

    if (!userFound.password) {
      return throwError(() => new Error('Senha ainda não criada, click no link de "Primeiro acesso"')).pipe(delay(800));
    }

    if (userFound.password !== password) {
      return throwError(() => new Error('Senha inválida, tente novamente.')).pipe(delay(800),
      );
    }

    return of({token: 'mock-token-123'}).pipe(delay(800));
  }
}