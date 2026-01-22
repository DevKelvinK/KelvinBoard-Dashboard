import { Component } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent{
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  isMenuOpen: boolean = false;

  closeMenu() {
    this.isMenuOpen = false;
  }

  logout() {
     this.authService.logout()
     this.router.navigate(['/login']);
  }
}
