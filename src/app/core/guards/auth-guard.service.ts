import { Injectable } from '@angular/core';
import { CanMatch, Route, Router, UrlSegment, UrlTree } from '@angular/router';

import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanMatch {
  constructor(
    private router: Router,
    private storageService: StorageService,
  ) {}

  canMatch(): boolean | UrlTree {
    const authToken = this.storageService.getToken();

    if (authToken) {
      return true;
    }

    return this.router.createUrlTree(['/login']);
  }
}