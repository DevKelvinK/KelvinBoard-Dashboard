import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class StorageService {

  setToken(token: string): void {
    localStorage.setItem('auth-token', token);
  }

  setUserEmail(email: string): void {
    localStorage.setItem('user-email', email);
  }

  getToken(): string | null {
    return localStorage.getItem('auth-token')
  }

  getUserEmail(): string | null {
    return localStorage.getItem('user-email')
  }
  
  clear(): void {
    localStorage.removeItem('auth-token')
    localStorage.removeItem('user-email')
  }
}