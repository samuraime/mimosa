import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';
import template from './nav.component.html';
import style from './nav.component.scss';

@Component({
  selector: 'mms-nav',
  template,
  styles: [style],
})
export class NavComponent {
  constructor(authService: AuthService, router: Router) {
    this.authService = authService;
    this.router = router;
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['']);
    return false;
  }
  getLoggedIn() {
    return this.authService.getLoggedIn();
  }
}
