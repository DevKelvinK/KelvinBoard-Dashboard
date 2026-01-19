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

  createPassword(email: string, code: string, newPassword: string) {
    return this.apiMockService.createPassword(email, code, newPassword);
  }

  login(email: string, password: string) {
    return this.apiMockService.login(email, password).pipe(
      tap((res) => {
        this.storageService.setToken(res.token);
      }),
    );
  }

  logout() {
    this.storageService.clear();
  }
}
