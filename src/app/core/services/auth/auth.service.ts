import { Injectable } from '@angular/core';
import { tap } from 'rxjs';

import { AuthMockService } from './auth-mock.service';
import { StorageService } from '../storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private authMockService: AuthMockService,
    private storageService: StorageService
  ) {}

  login(email: string, password: string) {
    return this.authMockService.login(email, password).pipe(
      tap((res) => {
        this.storageService.setToken(res.token);
        this.storageService.setUserEmail(email);
      }),
    );
  }

  createPassword(email: string, code: string, newPassword: string) {
    return this.authMockService.createPassword(email, code, newPassword);
  }
  
  requestPasswordReset(email: string) {
    return this.authMockService.requestPasswordReset(email);
  }

  confirmPasswordReset(email: string, code: string, newPassword: string) {
    return this.authMockService.confirmPasswordReset(email, code, newPassword);
  }

  logout() {
    this.storageService.clear();
  }
}
