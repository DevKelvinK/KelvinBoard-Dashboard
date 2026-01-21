import { Injectable } from '@angular/core';
import { tap } from 'rxjs';

import { ApiMockService } from '../../core/services/api-mock.service';
import { StorageService } from '../../core/services/storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private apiMockService: ApiMockService,
    private storageService: StorageService
  ) {}

  login(email: string, password: string) {
    return this.apiMockService.login(email, password).pipe(
      tap((res) => {
        this.storageService.setToken(res.token);
        this.storageService.setUserEmail(email);
      }),
    );
  }

  createPassword(email: string, code: string, newPassword: string) {
    return this.apiMockService.createPassword(email, code, newPassword);
  }
  
  requestPasswordReset(email: string) {
    return this.apiMockService.requestPasswordReset(email);
  }

  confirmPasswordReset(email: string, code: string, newPassword: string) {
    return this.apiMockService.confirmPasswordReset(email, code, newPassword);
  }

  logout() {
    this.storageService.clear();
  }
}
