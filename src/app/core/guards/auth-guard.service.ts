import { Injectable } from '@angular/core';
import { CanMatch, Route, Router, UrlSegment, UrlTree } from '@angular/router';

import { StorageService } from '../services/storage.service';
import { ToastService } from '../services/toast.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanMatch {
  constructor(
    private router: Router,
    private storageService: StorageService,
    private toastService: ToastService,
  ) {}

  canMatch(): boolean | UrlTree {
    const authToken = this.storageService.getToken();

    if (authToken) {
      return true;
    }

    this.toastService.error('Você precisa estar logado para acessar o Dashboard');
    return this.router.createUrlTree(
      ['/error'],
      {
        queryParams: {code: 403}
      }
    )
  }
}