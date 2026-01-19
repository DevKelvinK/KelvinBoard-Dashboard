import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class StorageService {

  setToken(token: string): void {
    localStorage.setItem('auth-token', token);
  }
  
  getToken(): string | null {
    return localStorage.getItem('auth-token')
  }

  clear(): void {
    localStorage.removeItem('auth-token')
  }
}